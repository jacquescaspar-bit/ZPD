-- Create enrollment_sessions table for storing incomplete enrollment data
CREATE TABLE IF NOT EXISTS enrollment_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255),
    stripe_payment_intent_id VARCHAR(255),
    enrollment_data JSONB DEFAULT '{}',
    insights_data JSONB DEFAULT '{}',
    current_step VARCHAR(50) NOT NULL CHECK (current_step IN ('plan', 'payment', 'insights')),
    progress_status JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '30 days')
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_enrollment_sessions_session_id ON enrollment_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_enrollment_sessions_email ON enrollment_sessions(email) WHERE email IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_enrollment_sessions_stripe_payment_intent_id ON enrollment_sessions(stripe_payment_intent_id) WHERE stripe_payment_intent_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_enrollment_sessions_current_step ON enrollment_sessions(current_step);
CREATE INDEX IF NOT EXISTS idx_enrollment_sessions_expires_at ON enrollment_sessions(expires_at);

-- Trigger to automatically update updated_at
CREATE TRIGGER update_enrollment_sessions_updated_at
    BEFORE UPDATE ON enrollment_sessions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();