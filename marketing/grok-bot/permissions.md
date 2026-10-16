# Account permissions — all ZPD Bots

Grok Bot Auto-review is account-wide. Set these before either Bot runs unattended.

**Settings → General → Auto-review**

## Mailbox (hard rule)

Mail client is **Zoho Mail**. Identity is **grow@zpdlearning.com**.

Sign in only to Zoho as grow@. Do not sign Gmail or **jacquescaspar@gmail.com** into the Agent Computer. Never send, reply, or set From / Reply-To as the Gmail address.

If Zoho grow@ is unavailable, fail the run. Do not fall back to Gmail.

## Require approval (always)

- Sending any external email (Zoho grow@zpdlearning.com only — never Gmail)
- Publishing or posting on Facebook, Instagram, Google Business, a website, or Ads Manager
- Joining a Facebook group or accepting a group membership question
- Any Ads Manager change, campaign publish, budget edit, or purchase
- Payment, checkout, or adding a payment method
- Deleting or overwriting data in admin, CRM, or Drive
- Changing production site settings or Vercel env vars

## Always allow (narrow)

- Reading `https://zpdlearning.com` and `/admin` (GET only)
- Reading files under `/workspace/zpd-marketing`
- Writing drafts and logs under `/workspace/zpd-marketing/tracking` and `/workspace/zpd-marketing/grok-bot/runs`

Do **not** add “always allow the browser.”

## Local computer

**Settings → General → Agent → Execution on Local Computer:** Never allowed.

Playbook lives on the cloud computer at `/workspace/zpd-marketing`. No access to the Mac.

## Human-only (never the Bot, even if Auto-review misfires)

Passwords, passkeys, 2FA, CAPTCHAs, payment confirmations, Facebook group membership answers, Ads Manager **Publish**, Meta Pixel ID into Vercel.

Take over Agent Computer for those. Do not paste secrets into chat.

## Approval is you, not the other Bot

Scout “looks good” or Operator “Validator passed” is not permission to send. Only **Allow once** / **Approve once** from the account holder.
