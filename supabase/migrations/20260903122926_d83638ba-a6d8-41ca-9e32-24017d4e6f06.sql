CREATE OR REPLACE FUNCTION public.spend_coins(cost integer)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  new_total integer;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;
  IF cost IS NULL OR cost < 1 OR cost > 10000000 THEN
    RAISE EXCEPTION 'Invalid cost';
  END IF;

  PERFORM set_config('app.allow_profile_score_write', 'on', true);

  UPDATE public.profiles
    SET total_coins = total_coins - cost
    WHERE user_id = auth.uid()
      AND total_coins >= cost
    RETURNING total_coins INTO new_total;

  PERFORM set_config('app.allow_profile_score_write', 'off', true);

  IF new_total IS NULL THEN
    RAISE EXCEPTION 'Insufficient coins';
  END IF;

  RETURN new_total;
END;
$function$;

REVOKE ALL ON FUNCTION public.spend_coins(integer) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.spend_coins(integer) FROM anon;
GRANT EXECUTE ON FUNCTION public.spend_coins(integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.spend_coins(integer) TO service_role;