-- Add allowed_plans column to promo_codes table
ALTER TABLE promo_codes
ADD COLUMN allowed_plans TEXT[] DEFAULT ARRAY['trial', 'online', 'essential', 'intensive'];