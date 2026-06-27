# ZPD Referral System - Production Deployment Guide

This guide covers the production setup for the referral code system with database integration, email services, and security measures.

## Prerequisites

- PostgreSQL database (version 12+)
- SendGrid account for email delivery
- Stripe account with webhook configuration
- Node.js 18+ and pnpm

## Environment Setup

Update your `.env.local` file with production values (copy from `.env.example` first and replace the placeholder values with your production secrets):

- Use live Stripe keys + real webhook secret from dashboard.
- See `.env.example` for the full list and comments.

```
# (example - see .env.example for complete template)
DATABASE_URL=postgresql://...
SENDGRID_API_KEY=SG_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Database Setup

1. **Create PostgreSQL Database**

   ```sql
   CREATE DATABASE zpd_db;
   CREATE USER zpd_user WITH ENCRYPTED PASSWORD 'your_secure_password';
   GRANT ALL PRIVILEGES ON DATABASE zpd_db TO zpd_user;
   ```

2. **Run Database Migrations**

   ```bash
   pnpm db:setup
   ```

   This will create all necessary tables:
   - `referral_codes` - Stores referral codes and metadata
   - `enrollments` - Tracks all enrollments
   - `referral_analytics` - Analytics data for referrals
   - `promo_codes` - Stores promo codes with usage tracking
   - `promo_analytics` - Analytics data for promo codes

## Email Configuration

1. **SendGrid Setup**
   - Create a SendGrid account
   - Generate an API key with full access
   - Verify your domain or single sender
   - Update the `FROM_EMAIL` in environment variables

2. **Email Templates**
   The system includes two automated email templates:
   - **Referral Code Email**: Sent to purchasers with their new code
   - **Propagation Email**: Sent to referrers when their code is used

## Stripe Webhook Configuration

1. **Create Webhook Endpoint**
   - In your Stripe dashboard, go to Webhooks
   - Add endpoint: `https://zpdlearning.com/api/webhooks/stripe`
   - Select events: `payment_intent.succeeded`
   - Copy the webhook secret to `STRIPE_WEBHOOK_SECRET`

2. **Security Features**
   - Rate limiting (10 requests/minute per IP)
   - Signature verification
   - Basic request validation hooks (extensible)

## Analytics Dashboard

Access referral analytics via the API:

```bash
GET /api/analytics/referrals?period=30d
```

Returns:

- Daily referral generation/usage stats
- Top referrers leaderboard
- Enrollment conversion rates
- Revenue attribution

## Monitoring & Alerts

### Key Metrics to Monitor

1. **Referral Performance**
   - Code generation rate
   - Usage conversion rate
   - Propagation depth

2. **System Health**
   - Database connection status
   - Email delivery rates
   - Webhook processing success

3. **Security**
   - Failed webhook attempts
   - Rate limit hits
   - Invalid referral code attempts

### Recommended Monitoring Tools

- **Database**: Set up connection pooling alerts
- **Email**: Monitor SendGrid delivery statistics
- **Application**: Use Vercel Analytics or similar for performance monitoring

## Security Considerations

### Data Protection

- **Database encryption at rest**: depends on your Postgres provider (e.g. managed Postgres commonly provides disk encryption). This app does not add application-level encryption.
- **Email addresses**: currently stored in plaintext in the database tables and used for operational emails/analytics events. If you need hashed/pseudonymized emails, you’ll need to implement it in the storage layer.
- **Payments**: the app does not store full card details; it relies on Stripe. It does store Stripe PaymentIntent IDs and basic enrollment metadata.

### Rate Limiting

- **Webhook endpoint**: currently rate-limited by IP using an in-memory map (works for a single process; not reliable across multiple instances/serverless cold starts).
- For production scaling, consider Redis/Upstash (shared rate-limit store) or a WAF/CDN-level rate limit.
- Consider adding authentication (or restricting by role) for admin/analytics endpoints.

### Backup Strategy

- Daily database backups
- Encrypted backup storage
- Test restore procedures monthly

## Performance Optimization

### Database

- Uses `pg.Pool` (basic pooling within a single Node process). For high traffic or many server instances, consider an external pooler (e.g. PgBouncer) and/or serverless-friendly Postgres.
- Indexes on frequently queried columns
- Query optimization for analytics

### Email Delivery

- Email sending happens inline during webhook processing. For higher reliability, move email sends to a queue/background job and add retries + dead-letter handling.

## Troubleshooting

### Common Issues

1. **Database Connection Errors**

   ```bash
   # Check connection string
   pnpm exec tsx -e "import pool from './app/lib/db'; pool.query('SELECT 1').then(() => console.log('Connected'))"
   ```

2. **Email Not Sending**
   - Verify SendGrid API key
   - Check sender verification
   - Review SendGrid activity feed

3. **Webhook Failures**
   - Verify Stripe webhook secret
   - Check server logs for rate limiting
   - Ensure database connectivity

### Logs to Monitor

- Database query performance
- Email delivery status
- Webhook processing times
- Rate limit violations

## Scaling Considerations

### Database Scaling

- Implement read replicas for analytics
- Consider partitioning for large datasets
- Monitor query performance

### Email Scaling

- Upgrade SendGrid plan as needed
- Implement email queuing for high volume
- Consider multiple sending domains

### Application Scaling

- Implement Redis for shared rate limiting (and any future queue/session needs)
- Use CDN for static assets
- Monitor memory usage and optimise

## Backup & Recovery

## Promo Code Management

The system now supports database-driven promo codes with advanced features:

### Features

- **Usage Tracking**: Monitor how many times each promo code is used
- **Expiration Management**: Automatic expiry date handling
- **Dynamic Management**: Add/remove/modify promo codes without code deployments
- **Analytics**: Track promo code performance and effectiveness

### Managing Promo Codes

#### Adding New Promo Codes

```sql
INSERT INTO promo_codes (code, discount_cents, description, max_uses, expires_at)
VALUES ('NEWCODE2024', 2000, '$20 off special offer', 500, '2024-12-31');
```

#### Checking Usage

```sql
SELECT code, current_uses, max_uses, expires_at
FROM promo_codes
WHERE is_active = true;
```

#### Deactivating Promo Codes

```sql
UPDATE promo_codes SET is_active = false WHERE code = 'OLDCODE';
```

### API Endpoints

- `POST /api/promo-codes/validate` - Validate promo code
- `POST /api/promo-codes/increment-usage` - Track usage

### Migration Notes

Existing promo codes from `constants.ts` are automatically migrated during database setup. The system now uses database storage exclusively for better scalability and management.

## Analytics Dashboard

### Referral Analytics

Access comprehensive referral metrics:

```bash
GET /api/analytics/referrals?period=30d
```

Returns:

- Daily referral generation/usage stats
- Top referrers leaderboard
- Enrollment conversion rates
- Revenue attribution

### Promo Code Analytics

Track promo code effectiveness:

```sql
SELECT
  pc.code,
  pc.discount_cents,
  pc.current_uses,
  COUNT(pa.id) as total_events
FROM promo_codes pc
LEFT JOIN promo_analytics pa ON pc.id = pa.promo_code_id
GROUP BY pc.id, pc.code, pc.discount_cents, pc.current_uses;
```

### Automated Backups

```bash
# Example cron job for daily backups
0 2 * * * pg_dump zpd_db > /backups/zpd_$(date +\%Y\%m\%d).sql
```

### Recovery Procedure

1. Restore database from backup
2. Verify data integrity
3. Update environment variables if needed
4. Test all functionality

## Support & Maintenance

### Regular Tasks

- Monitor analytics dashboard weekly
- Review email delivery rates
- Update dependencies monthly
- Security audit quarterly

### Emergency Contacts

- Database administrator
- SendGrid support
- Stripe support
- Hosting provider

---

## Quick Start Checklist

- [ ] Environment variables configured
- [ ] Database created and migrated
- [ ] SendGrid account and API key
- [ ] Stripe webhook configured
- [ ] SSL certificate installed
- [ ] Domain DNS configured
- [ ] Monitoring tools set up
- [ ] Backup strategy implemented
- [ ] Test referral flow end-to-end

The referral system is ready to deploy, but for production at scale you’ll want shared rate limiting (Redis/WAF) and background job processing for webhook side-effects (email).
