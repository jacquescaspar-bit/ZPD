-- Create referral_codes table
CREATE TABLE IF NOT EXISTS referral_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(20) UNIQUE NOT NULL,
    owner_email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    used_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    allowed_plans TEXT[] DEFAULT ARRAY['essential', 'intensive'],
    source_code_id UUID REFERENCES referral_codes(id),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_referral_codes_code ON referral_codes(code);
CREATE INDEX IF NOT EXISTS idx_referral_codes_owner_email ON referral_codes(owner_email);
CREATE INDEX IF NOT EXISTS idx_referral_codes_active ON referral_codes(is_active) WHERE is_active = true;

-- Create enrollments table for tracking
CREATE TABLE IF NOT EXISTS enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stripe_payment_intent_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    plan_type VARCHAR(50) NOT NULL,
    referral_code_used VARCHAR(20),
    amount_cents INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'completed'
);

-- Create indexes for enrollments
CREATE INDEX IF NOT EXISTS idx_enrollments_email ON enrollments(email);
CREATE INDEX IF NOT EXISTS idx_enrollments_referral_code ON enrollments(referral_code_used);
CREATE INDEX IF NOT EXISTS idx_enrollments_stripe_id ON enrollments(stripe_payment_intent_id);

-- Create promo_codes table
CREATE TABLE IF NOT EXISTS promo_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_cents INTEGER NOT NULL,
    description TEXT NOT NULL,
    max_uses INTEGER, -- NULL means unlimited
    current_uses INTEGER DEFAULT 0,
    expires_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for promo codes
CREATE INDEX IF NOT EXISTS idx_promo_codes_code ON promo_codes(code);
CREATE INDEX IF NOT EXISTS idx_promo_codes_active ON promo_codes(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_promo_codes_expires_at ON promo_codes(expires_at) WHERE expires_at IS NOT NULL;

-- Create analytics table for referral tracking
CREATE TABLE IF NOT EXISTS referral_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    referral_code_id UUID REFERENCES referral_codes(id),
    event_type VARCHAR(50) NOT NULL, -- 'generated', 'used', 'converted'
    email VARCHAR(255),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for analytics
CREATE INDEX IF NOT EXISTS idx_referral_analytics_code_id ON referral_analytics(referral_code_id);
CREATE INDEX IF NOT EXISTS idx_referral_analytics_event_type ON referral_analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_referral_analytics_created_at ON referral_analytics(created_at);

-- Create analytics table for promo code tracking
CREATE TABLE IF NOT EXISTS promo_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    promo_code_id UUID REFERENCES promo_codes(id),
    event_type VARCHAR(50) NOT NULL, -- 'applied', 'expired', 'deactivated'
    email VARCHAR(255),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for promo analytics
CREATE INDEX IF NOT EXISTS idx_promo_analytics_code_id ON promo_analytics(promo_code_id);
CREATE INDEX IF NOT EXISTS idx_promo_analytics_event_type ON promo_analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_promo_analytics_created_at ON promo_analytics(created_at);

-- Function to update updated_at timestamp for promo codes
CREATE TRIGGER update_promo_codes_updated_at
    BEFORE UPDATE ON promo_codes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_referral_codes_updated_at
    BEFORE UPDATE ON referral_codes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();