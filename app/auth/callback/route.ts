import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const DEFAULT_TEMPLATES = [
  {
    name: "Mockup Offer",
    template_type: "Mockup Offer",
    content: `Hey [Name], saw you just [specific thing from their post]. I make motion videos for SaaS (launch videos, explainers, onboarding). Put together a quick 20-second concept using your product screenshots (Loom attached — took ~15 mins). No strings attached — would love your honest feedback. Worth a quick chat?`,
    use_case: "Best for warm leads where you've done a quick mockup",
  },
  {
    name: "Value First",
    template_type: "Value-First",
    content: `Hey [Name], really liked your post about [specific topic]. I help SaaS teams create high-converting launch and explainer videos. Happy to send over 2–3 examples from similar tools if you're thinking about video content soon.`,
    use_case: "Good opener when you engaged with their content",
  },
  {
    name: "Low Pressure",
    template_type: "Initial Outreach",
    content: `Hey [Name], congrats on the recent launch! I specialize in SaaS motion design (launch videos & explainers). Open to chatting about video for your next push? No pressure at all.`,
    use_case: "Great for fresh launch announcements",
  },
  {
    name: "Follow-Up",
    template_type: "Follow-Up",
    content: `Hey [Name], just circling back on the concept I sent. Any thoughts? Happy to tweak it.`,
    use_case: "Send 5-7 days after no reply",
  },
];

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      // Seed profile + data on first confirmed login
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", data.user.id)
        .single();

      if (!existingProfile) {
        const fullName = data.user.user_metadata?.full_name ?? "";
        await supabase.from("profiles").upsert({
          id: data.user.id,
          full_name: fullName,
          business_name: "My Motion Design Studio",
          monthly_revenue_goal: 3000,
          pc_goal_target: 3000,
        });
        await supabase.from("dm_templates").insert(
          DEFAULT_TEMPLATES.map((t) => ({ ...t, user_id: data.user!.id }))
        );
        await supabase.from("savings_goals").insert({
          goal_name: "New PC Build",
          description: "Ryzen 9 9900X + RTX 5070 Ti level build for smooth 4K editing",
          target_amount: 3000,
          user_id: data.user.id,
        });
      }

      return NextResponse.redirect(`${origin}/dashboard`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`);
}
