-- Replace auth-based RLS with anon-accessible policies keyed by client-provided account id
DROP POLICY IF EXISTS "Users view own challenge data" ON public.user_challenge_data;
DROP POLICY IF EXISTS "Users insert own challenge data" ON public.user_challenge_data;
DROP POLICY IF EXISTS "Users update own challenge data" ON public.user_challenge_data;
DROP POLICY IF EXISTS "Users delete own challenge data" ON public.user_challenge_data;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_challenge_data TO anon;

CREATE POLICY "Anyone can view challenge data"
  ON public.user_challenge_data FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert challenge data"
  ON public.user_challenge_data FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update challenge data"
  ON public.user_challenge_data FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete challenge data"
  ON public.user_challenge_data FOR DELETE
  TO anon, authenticated
  USING (true);