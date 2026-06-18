"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Zap, Mail, Lock, User, Loader2 } from "lucide-react";

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

const DEFAULT_SAVINGS_GOAL = {
  goal_name: "New PC Build",
  description: "Ryzen 9 9900X + RTX 5070 Ti level build for smooth 4K editing",
  target_amount: 3000,
};

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      if (!data.session) {
        // Email confirmation required — session won't exist until confirmed
        toast.success("Check your email to confirm your account, then sign in.");
        router.push("/login");
        setLoading(false);
        return;
      }

      // Confirmed immediately (email confirmation disabled) — seed data now
      await supabase.from("profiles").upsert({
        id: data.user.id,
        full_name: name,
        business_name: "My Motion Design Studio",
        monthly_revenue_goal: 3000,
        pc_goal_target: 3000,
      });

      await supabase.from("dm_templates").insert(
        DEFAULT_TEMPLATES.map((t) => ({ ...t, user_id: data.user!.id }))
      );

      await supabase.from("savings_goals").insert({
        ...DEFAULT_SAVINGS_GOAL,
        user_id: data.user.id,
      });

      toast.success("Account created! Welcome to Actionable.");
      router.push("/dashboard");
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f1117] p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">Actionable</h1>
            <p className="text-sm text-slate-500 mt-1">Start landing SaaS clients today</p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-6">
          <h2 className="text-lg font-semibold text-slate-100 mb-5">Create your account</h2>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-300">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your name"
                  className="flex h-9 w-full rounded-lg border border-slate-700 bg-slate-800/50 pl-9 pr-3 py-1 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-300">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="flex h-9 w-full rounded-lg border border-slate-700 bg-slate-800/50 pl-9 pr-3 py-1 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  placeholder="Min. 6 characters"
                  className="flex h-9 w-full rounded-lg border border-slate-700 bg-slate-800/50 pl-9 pr-3 py-1 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white hover:bg-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Account"}
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
