CREATE TABLE public.user_challenge_data (
  user_id UUID NOT NULL PRIMARY KEY,
  goals JSONB NOT NULL DEFAULT '[]'::jsonb,
  history JSONB NOT NULL DEFAULT '[]'::jsonb,
  completed JSONB NOT NULL DEFAULT '{}'::jsonb,
  last_day TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_challenge_data TO authenticated;
GRANT ALL ON public.user_challenge_data TO service_role;

ALTER TABLE public.user_challenge_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own challenge data"
ON public.user_challenge_data FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users insert own challenge data"
ON public.user_challenge_data FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users update own challenge data"
ON public.user_challenge_data FOR UPDATE
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users delete own challenge data"
ON public.user_challenge_data FOR DELETE
TO authenticated
USING (user_id = auth.uid());