-- Diagnostic credit redemption + discount audit on enrollments
ALTER TABLE enrollments
  ADD COLUMN IF NOT EXISTS credit_redeemed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS credit_source_enrollment_id UUID REFERENCES enrollments(id),
  ADD COLUMN IF NOT EXISTS promo_code_used VARCHAR(50),
  ADD COLUMN IF NOT EXISTS discount_kind VARCHAR(30) DEFAULT 'none',
  ADD COLUMN IF NOT EXISTS discount_cents INTEGER DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_enrollments_diagnostic_credit_eligible
  ON enrollments (LOWER(email), plan_type)
  WHERE plan_type = 'trial' AND credit_redeemed_at IS NULL;
