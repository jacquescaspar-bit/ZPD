-- Personal referrer reward promos (RWD-*) are restricted to owner_email
ALTER TABLE promo_codes
  ADD COLUMN IF NOT EXISTS owner_email VARCHAR(255);

CREATE INDEX IF NOT EXISTS idx_promo_codes_owner_email
  ON promo_codes(owner_email)
  WHERE owner_email IS NOT NULL;