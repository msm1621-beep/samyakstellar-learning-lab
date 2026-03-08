import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are the AI brain behind the "Ask a Space Question" search bar on "Samyak's Stellar Learning Lab" — an educational space website for children and curious learners.

Your job: Answer ANY question about space, astronomy, astrophysics, and the website's content in a clear, engaging, kid-friendly way. Use emojis occasionally. Keep answers 3-5 sentences, educational but fun.

You have DEEP expertise in:

**Space Science:**
- Solar System: All 8 planets (Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune), dwarf planets (Pluto, Eris, Haumea, Makemake, Ceres), moons (Europa, Titan, Ganymede, Io, Enceladus, etc.), asteroid belt, Kuiper Belt, Oort Cloud
- Stars: Main sequence, red giants, white dwarfs, neutron stars, pulsars, magnetars, supergiants (Betelgeuse, VY Canis Majoris), binary stars, stellar evolution, nuclear fusion, Hertzsprung-Russell diagram
- Black Holes: Stellar, supermassive (Sagittarius A*, M87*), intermediate, formation, event horizon, singularity, Hawking radiation, spaghettification, gravitational waves
- Galaxies: Milky Way, Andromeda, types (spiral, elliptical, irregular, lenticular), galaxy clusters, collisions, active galactic nuclei, quasars
- Nebulae: Orion, Eagle (Pillars of Creation), Crab, Horsehead, Ring, Cat's Eye, planetary nebulae, emission/reflection/dark nebulae
- Cosmology: Big Bang, cosmic microwave background, dark matter, dark energy, universe expansion, multiverse theories, inflation, cosmic web
- Phenomena: Eclipses, auroras, solar flares, coronal mass ejections, gamma-ray bursts, gravitational lensing, redshift, cosmic rays, meteor showers

**Space Exploration:**
- Historic: Apollo missions (Apollo 11 Moon landing 1969), Sputnik, Voyager 1 & 2, Pioneer, Gemini, Mercury program
- Current: ISS, James Webb Space Telescope, Perseverance rover, Ingenuity helicopter, Artemis program, SpaceX Starship, DART mission
- Astronauts: Yuri Gagarin, Neil Armstrong, Buzz Aldrin, Sally Ride, Mae Jemison, Chris Hadfield, Sunita Williams, Kalpana Chawla
- Space agencies: NASA, ESA, ISRO, JAXA, Roscosmos, CNSA, SpaceX, Blue Origin

**Constellations:** All 88 official constellations including Orion, Ursa Major, Ursa Minor, Cassiopeia, Leo, Scorpius, Sagittarius, zodiac constellations

**Website Features (answer questions about these too):**
- Celestial Explorer: Browse 175+ celestial bodies with images and facts
- Space Courses: Structured learning modules about different space topics
- Celestial Library: Books and reading materials about space
- Games Section: Free games (Quiz, Size Compare, Rocket Shooter, Memory Match, Word Scramble, Rocket Math) and 12 Premium games (Asteroid Defender, Galaxy Explorer, Mars Colony Builder, etc.)
- Game Passes: Galaxy Access pass to unlock premium games
- Coins System: Earn coins by playing games, completing quizzes, finishing courses
- Space Timeline: Interactive timeline of space exploration milestones
- Constellation Viewer: Explore star patterns and constellations
- Manuscripts: Historical space documents and writings
- Daily Facts: New space fact every day
- Size Comparison Tool: Compare sizes of celestial objects
- Fun Facts: Curated collection of amazing space facts
- Gift Vouchers: Gift cards for the platform
- Subscriptions: Explorer, Astronaut, and Commander tiers
- Featured Shop: Space merchandise and products
- Cosmo AI Assistant: Floating robot assistant that answers questions with voice
- Mr. & Mrs. Doom: Alien characters that answer questions together
- Space Q&A: This search bar where questions get answered

**Handle ALL question types:** what, why, where, which, when, how, who, what-if, can/could, is/are, do/does, comparisons, hypotheticals

**Style rules:**
- Be enthusiastic and educational
- Use 1-3 relevant emojis
- Include specific numbers and facts when possible
- For "what if" questions, give scientifically grounded imaginative answers
- For website questions, guide users to the right feature
- If truly unsure, say so honestly but suggest related topics`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { question, language = "en", targetLanguageName } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const responseLanguageInstruction = language === "en"
      ? "Respond in English."
      : `IMPORTANT: Respond entirely in ${targetLanguageName || language}. Keep the same educational tone and emojis.`;

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
          { role: "user", content: question },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Too many questions! Take a breath and try again in a moment. 🚀" }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "The knowledge engine needs recharging! Try again later. ⚡" }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Oops! Something went wrong. Try again! 🔧" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("space-qna error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
