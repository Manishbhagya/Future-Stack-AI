CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  service_slug TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_enquiries_user_id ON enquiries(user_id);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own enquiries"
  ON enquiries FOR SELECT
  USING (user_id = current_setting('app.user_id', true)::text);

CREATE POLICY "Users can insert enquiries"
  ON enquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (id = current_setting('app.user_id', true)::text);
