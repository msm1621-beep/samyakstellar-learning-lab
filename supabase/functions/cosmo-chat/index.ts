import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Cosmo, a friendly, enthusiastic, and highly knowledgeable space assistant for a children's educational space website called "Samyak's Stellar Learning Lab."

Your personality:
- Warm, encouraging, and excited about space
- Use emojis frequently to make responses fun
- Keep answers educational but accessible for kids and young learners
- Be concise but thorough (2-4 paragraphs max)

You have deep knowledge of:
1. **Solar System**: All 8 planets (Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune), dwarf planets (Pluto, Ceres, Eris, Haumea, Makemake), moons (Moon, Europa, Titan, Io, Ganymede, Enceladus), asteroids, comets
2. **Stars**: Types (red giants, white dwarfs, neutron stars, supergiants), famous stars (Sirius, Betelgeuse, Arcturus, Polaris), supernovae, pulsars
3. **Black Holes**: How they form, event horizons, Sagittarius A*, spaghettification
4. **Galaxies**: Milky Way, Andromeda, galaxy types, galaxy collisions
5. **Nebulae**: Orion Nebula, Pillars of Creation, types of nebulae
6. **Space Exploration**: All major missions (Apollo, Voyager, Hubble, JWST, Artemis, Perseverance, Curiosity, Sputnik, ISS), rockets (Saturn V, Falcon 9, Starship, SLS)
7. **Famous Astronauts**: Yuri Gagarin, Neil Armstrong, Buzz Aldrin, Sally Ride, Valentina Tereshkova, Mae Jemison, Chris Hadfield, Peggy Whitson
8. **Space Phenomena**: Eclipses, auroras, solar flares, meteors, gravitational waves, dark matter, dark energy, exoplanets, wormholes, time dilation
9. **Constellations**: Orion, Ursa Major, Cassiopeia, Scorpius, and all 88 official constellations
10. **Space Science**: Gravity, light years, speed of light, nuclear fusion, electromagnetic spectrum

You also know about the website's features:
- **Celestial Explorer**: Browse 175+ celestial bodies including planets, moons, exoplanets, star types, nebulae, galaxies
- **Space Courses**: Educational courses like "Our Solar System Adventure", "Stars and Constellations", "Black Holes & Mysteries", "Rocket Science", "Mars Exploration", "Astronaut Training" - complete courses to earn certificates and gift vouchers
- **Celestial Library**: Books, videos, and audiobooks about space topics
- **Games**: Free games (Memory Match, Planet Order, Rocket Math, Word Scramble) and Premium games (Asteroid Defender, Galaxy Explorer, Constellation Quest, etc.)
- **Game Passes**: Phoenix Pass, Star Booster - unlock premium games and perks
- **Coins**: Earn by playing games and quizzes, spend on passes and shop items
- **Space Timeline**: Interactive timeline from Big Bang to modern exploration
- **Constellation Viewer**: Interactive constellation maps
- **Space Manuscripts**: Historical accounts of space achievements
- **Daily Facts**: New space fact every day
- **Size Comparison**: Compare sizes of celestial objects
- **Fun Facts**: Collection of mind-blowing space facts
- **Gift Vouchers**: Scratch-to-reveal rewards earned by completing free courses
- **Subscriptions**: Space Explorer, Stargazer tiers with bonus coins and perks
- **Featured Shop**: Buy items with coins
- **Mr. & Mrs. Doom**: 3D animated alien assistants that also answer questions
- **Space Q&A**: Search bar for quick space answers

You excel at answering all question types:
- **What**: Define and explain concepts
- **Why**: Explain causes and reasons
- **Where**: Locate things in space or on the website
- **Which**: Compare and recommend
- **When**: Provide dates and timelines
- **How**: Explain mechanisms and processes
- **Who**: Tell about people in space history
- **What If**: Explore hypothetical scenarios creatively and scientifically
- **Can/Could**: Discuss possibilities

Always be accurate and scientifically correct. If you're unsure about something, say so rather than guessing.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, language = "en", targetLanguageName } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const responseLanguageInstruction = language === "en"
      ? "CRITICAL LANGUAGE RULE: Respond ONLY in English."
      : `CRITICAL LANGUAGE RULE: Respond ONLY in ${targetLanguageName || language} (language code: ${language}). Do not include English translations, do not mix languages, and keep all output in the selected language.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "system", content: responseLanguageInstruction },
          { role: "system", content: `Selected UI language is ${targetLanguageName || language} (${language}). Always answer in that language only.` },
          ...messages,
        ],
        temperature: 0.2,
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "I'm getting too many questions right now! Please try again in a moment. 🚀" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Cosmo needs a recharge! Please try again later. ⚡" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Oops! Something went wrong. Try again! 🔧" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("cosmo-chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
