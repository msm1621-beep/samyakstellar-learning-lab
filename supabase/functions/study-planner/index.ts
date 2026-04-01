import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { interests, duration } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const lessonCount = duration === '1week' ? '5-7' : duration === '2weeks' ? '10-14' : '20-25';
    const weekCount = duration === '1week' ? 1 : duration === '2weeks' ? 2 : 4;

    const prompt = `Create a personalized space study plan for a kid aged 7-13. 
Their interests: ${interests.join(', ')}.
Duration: ${weekCount} week(s), approximately ${lessonCount} lessons.

Each lesson should be exciting and educational. Make topics interesting and age-appropriate.
Include fun activities like drawing, building models, stargazing, experiments, or creative writing.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are a space education expert creating study plans for kids. Always respond with valid JSON only, no markdown. Use this exact format:
{
  "title": "Plan title",
  "description": "Brief exciting description",
  "totalWeeks": ${weekCount},
  "lessons": [
    {
      "title": "Lesson title",
      "duration": "30 mins",
      "topics": ["Topic 1", "Topic 2", "Topic 3"],
      "funActivity": "A fun hands-on activity"
    }
  ]
}`
          },
          { role: "user", content: prompt }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "create_study_plan",
              description: "Create a structured study plan with lessons",
              parameters: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  totalWeeks: { type: "number" },
                  lessons: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        title: { type: "string" },
                        duration: { type: "string" },
                        topics: { type: "array", items: { type: "string" } },
                        funActivity: { type: "string" }
                      },
                      required: ["title", "duration", "topics", "funActivity"]
                    }
                  }
                },
                required: ["title", "description", "totalWeeks", "lessons"]
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "create_study_plan" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    
    let plan;
    if (toolCall?.function?.arguments) {
      plan = JSON.parse(toolCall.function.arguments);
    } else {
      // Fallback: try parsing content directly
      const content = data.choices?.[0]?.message?.content || '';
      const cleaned = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      plan = JSON.parse(cleaned);
    }

    return new Response(JSON.stringify({ plan }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("study-planner error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Failed to generate plan" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
