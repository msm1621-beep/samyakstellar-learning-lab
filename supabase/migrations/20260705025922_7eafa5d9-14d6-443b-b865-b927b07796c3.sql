
-- Restrict profile updates to non-score fields and add server-controlled increment RPC

-- Drop existing update policy
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- New policy: users may update their own row, but score columns must remain unchanged
CREATE POLICY "Users can update own profile (safe fields)"
ON public.profiles
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (
  user_id = auth.uid()
);

-- Prevent score tampering via trigger enforcing that total_coins/courses_completed
-- can only be changed through SECURITY DEFINER RPCs (which set a GUC flag)
CREATE OR REPLACE FUNCTION public.prevent_profile_score_tampering()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF current_setting('app.allow_profile_score_write', true) = 'on' THEN
    RETURN NEW;
  END IF;

  IF NEW.total_coins IS DISTINCT FROM OLD.total_coins
     OR NEW.courses_completed IS DISTINCT FROM OLD.courses_completed THEN
    RAISE EXCEPTION 'Direct updates to total_coins or courses_completed are not allowed';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_prevent_score_tampering ON public.profiles;
CREATE TRIGGER profiles_prevent_score_tampering
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.prevent_profile_score_tampering();

-- Bounded RPC to add coins
CREATE OR REPLACE FUNCTION public.add_coins(delta integer)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_total integer;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;
  IF delta IS NULL OR delta < 1 OR delta > 500 THEN
    RAISE EXCEPTION 'Invalid delta';
  END IF;

  PERFORM set_config('app.allow_profile_score_write', 'on', true);

  UPDATE public.profiles
    SET total_coins = LEAST(total_coins + delta, 10000000)
    WHERE user_id = auth.uid()
    RETURNING total_coins INTO new_total;

  PERFORM set_config('app.allow_profile_score_write', 'off', true);

  RETURN new_total;
END;
$$;

-- Bounded RPC to increment courses completed by 1
CREATE OR REPLACE FUNCTION public.increment_courses_completed()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_count integer;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  PERFORM set_config('app.allow_profile_score_write', 'on', true);

  UPDATE public.profiles
    SET courses_completed = LEAST(courses_completed + 1, 100000)
    WHERE user_id = auth.uid()
    RETURNING courses_completed INTO new_count;

  PERFORM set_config('app.allow_profile_score_write', 'off', true);

  RETURN new_count;
END;
$$;

REVOKE ALL ON FUNCTION public.add_coins(integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.add_coins(integer) TO authenticated;

REVOKE ALL ON FUNCTION public.increment_courses_completed() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.increment_courses_completed() TO authenticated;

REVOKE ALL ON FUNCTION public.prevent_profile_score_tampering() FROM PUBLIC, anon, authenticated;
