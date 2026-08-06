REVOKE EXECUTE ON FUNCTION public.get_leaderboard(integer) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.add_coins(integer) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.increment_courses_completed() FROM anon, public;
GRANT EXECUTE ON FUNCTION public.get_leaderboard(integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.add_coins(integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.increment_courses_completed() TO authenticated;