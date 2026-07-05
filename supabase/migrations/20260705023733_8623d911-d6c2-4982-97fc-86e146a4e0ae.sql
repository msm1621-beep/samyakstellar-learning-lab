
-- Restrict user_challenge_data to authenticated owners
DROP POLICY IF EXISTS "Anyone can delete challenge data" ON public.user_challenge_data;
DROP POLICY IF EXISTS "Anyone can insert challenge data" ON public.user_challenge_data;
DROP POLICY IF EXISTS "Anyone can update challenge data" ON public.user_challenge_data;
DROP POLICY IF EXISTS "Anyone can view challenge data" ON public.user_challenge_data;

REVOKE ALL ON public.user_challenge_data FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_challenge_data TO authenticated;
GRANT ALL ON public.user_challenge_data TO service_role;

CREATE POLICY "Users can view own challenge data"
  ON public.user_challenge_data FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own challenge data"
  ON public.user_challenge_data FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own challenge data"
  ON public.user_challenge_data FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own challenge data"
  ON public.user_challenge_data FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Restrict the profile bootstrap trigger function so only the trigger (postgres/service_role) can execute it
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM authenticated;
