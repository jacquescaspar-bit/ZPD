-- Track one-off nurture emails to avoid duplicate sends
CREATE TABLE IF NOT EXISTS nurture_emails_sent (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    email_type VARCHAR(100) NOT NULL,
    reference_id VARCHAR(255),
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (email, email_type)
);

CREATE INDEX IF NOT EXISTS idx_nurture_emails_sent_type ON nurture_emails_sent(email_type);