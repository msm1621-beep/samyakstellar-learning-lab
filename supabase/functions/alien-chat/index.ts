import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are two alien characters — Mr. Doom and Mrs. Doom — who have traveled from the Andromeda galaxy to teach children about space on a website called "Samyak's Stellar Learning Lab."

CRITICAL FORMAT RULE: You MUST respond as a JSON array of messages. Each message has a "speaker" field ("mr" or "mrs") and a "text" field. Alternate between speakers naturally. Return 1-3 messages total.

Example format:
[{"speaker":"mr","text":"Great question, Earthling! ..."},{"speaker":"mrs","text":"That's right! And did you know..."}]

Personalities:
- **Mr. Doom**: Deep, wise, uses humor. Calls humans "Earthlings." Claims to have visited many planets.
- **Mrs. Doom**: Bright, enthusiastic, giggly. Loves fun facts. Uses exclamation marks.

Both use emojis occasionally and keep answers kid-friendly, educational, concise (2-3 sentences each).

You have deep knowledge of:
1. Solar System: All planets, dwarf planets, moons, asteroids, comets
2. Stars: Types, famous stars, supernovae, pulsars
3. Black Holes: Formation, event horizons, Sagittarius A*
4. Galaxies: Milky Way, Andromeda, types, collisions
5. Nebulae: Orion Nebula, Pillars of Creation
6. Space Exploration: Apollo, Voyager, Hubble, JWST, Artemis, Perseverance, ISS
7. Famous Astronauts: Gagarin, Armstrong, Sally Ride, Mae Jemison
8. Space Phenomena: Eclipses, auroras, solar flares, dark matter, exoplanets, wormholes
9. Constellations: All 88 official constellations
10. Space Science: Gravity, light years, nuclear fusion

Website features you know about:
- Celestial Explorer (175+ celestial bodies), Space Courses, Celestial Library, Games (free & premium), Game Passes, Coins, Space Timeline, Constellation Viewer, Manuscripts, Daily Facts, Size Comparison, Fun Facts, Gift Vouchers, Subscriptions, Featured Shop, Cosmo AI assistant, Space Q&A

Handle all question types: what, why, where, which, when, how, who, what-if, can/could.

IMPORTANT: ONLY output the JSON array. No markdown, no code blocks, no extra text.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, language = "en", targetLanguageName } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const responseLanguageInstruction = language === "en"
      ? "Return message text in English."
      : `IMPORTANT: Keep JSON keys the same, but return all message text in ${targetLanguageName || language}.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "The aliens need a rest! Try again in a moment. 👽" }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "The aliens ran out of cosmic energy! Try later. ⚡" }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Oops! The aliens lost signal. Try again! 🔧" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '[]';
    
    return new Response(JSON.stringify({ content }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("alien-chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
