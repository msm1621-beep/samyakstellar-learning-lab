DROP POLICY IF EXISTS "Anyone can view profiles" ON public.profiles;

CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.get_leaderboard(limit_count integer DEFAULT 20)
RETURNS TABLE (
  display_name text,
  avatar_emoji text,
  courses_completed integer,
  total_coins integer
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT p.display_name, p.avatar_emoji, p.courses_completed, p.total_coins
  FROM public.profiles p
  WHERE p.courses_completed > 0
  ORDER BY p.courses_completed DESC, p.total_coins DESC
  LIMIT LEAST(GREATEST(COALESCE(limit_count, 20), 1), 100);
$$;

REVOKE ALL ON FUNCTION public.get_leaderboard(integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_leaderboard(integer) TO anon, authenticated;