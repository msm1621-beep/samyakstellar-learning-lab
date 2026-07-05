import { createClient } from "npm:@supabase/supabase-js@2";

export async function requireUser(req: Request): Promise<
  { user: { id: string; email?: string } } | { error: Response }
> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return {
      error: new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }),
    };
  }
  const token = authHeader.replace("Bearer ", "");
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
  );
  const { data, error } = await supabase.auth.getClaims(token);
  if (error || !data?.claims?.sub) {
    return {
      error: new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }),
    };
  }
  return { user: { id: data.claims.sub as string, email: data.claims.email as string | undefined } };
}

export function clampStr(v: unknown, max: number): string {
  return typeof v === "string" ? v.slice(0, max) : "";
}
