-- Link purchaser referral codes to Stripe payment intents for idempotent fulfillment
ALTER TABLE referral_codes
  ADD COLUMN IF NOT EXISTS stripe_payment_intent_id VARCHAR(255);

CREATE UNIQUE INDEX IF NOT EXISTS idx_referral_codes_stripe_payment_intent
  ON referral_codes(stripe_payment_intent_id)
  WHERE stripe_payment_intent_id IS NOT NULL;