"use client";

import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Copy, Star, Zap, Clock, Sun, Coffee, Moon } from "lucide-react";

// ── Click-to-copy chip ─────────────────────────────────────────────
function Chip({ label, quoted }: { label: string; quoted?: boolean }) {
  const text = quoted ? `"${label}"` : label;
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); toast.success("Copied"); }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700/80 bg-slate-800/50 text-slate-300 hover:border-indigo-500/50 hover:bg-slate-800 hover:text-white transition-colors group"
    >
      <span className="font-mono text-xs">{text}</span>
      <Copy className="h-3 w-3 shrink-0 text-slate-600 group-hover:text-indigo-400 transition-colors" />
    </button>
  );
}

// ── Platform section block ─────────────────────────────────────────
interface PlatformSection {
  platform: string;
  dot: string;
  terms: string[];
  quotedTerms?: string[];
  filters?: string[];
  tip?: string;
}

function PlatformBlock({ block }: { block: PlatformSection }) {
  return (
    <div className="rounded-xl border border-slate-700/40 bg-slate-800/20 p-4 space-y-3">
      <div className="flex items-center gap-2">
        <span className={cn("inline-block h-2 w-2 rounded-full shrink-0", block.dot)} />
        <span className="text-sm font-semibold text-slate-200">{block.platform}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {block.terms.map((t) => <Chip key={t} label={t} />)}
        {block.quotedTerms?.map((t) => <Chip key={t} label={t} quoted />)}
      </div>
      {block.filters && block.filters.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-[10px] uppercase tracking-wider font-medium text-slate-500">Filter by</p>
          <div className="flex flex-wrap gap-2">
            {block.filters.map((f) => (
              <span key={f} className="px-2.5 py-1 rounded-md border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs">{f}</span>
            ))}
          </div>
        </div>
      )}
      {block.tip && (
        <p className="text-xs text-slate-500 italic border-l-2 border-slate-700 pl-3 leading-relaxed">{block.tip}</p>
      )}
    </div>
  );
}

// ── Data ───────────────────────────────────────────────────────────
const TIERS = [
  {
    id: "agencies",
    label: "Tier 1",
    sublabel: "Agencies",
    color: "text-amber-400",
    activeBg: "bg-amber-500/20 border-amber-500/40 text-amber-300",
    inactiveBorder: "border-slate-700 text-slate-400",
    tagline: "Highest ROI — they already sell motion/creative and need overflow help",
    sections: [
      {
        platform: "LinkedIn",
        dot: "bg-blue-500",
        terms: ["Motion Design Agency", "Creative Agency", "Brand Agency", "Design Studio", "Creative Studio", "Video Production Agency", "Performance Marketing Agency", "Digital Agency"],
        filters: ["11–50 employees", "51–200 employees"],
        tip: "Sweet spot: big enough for budget, small enough to need freelancers.",
      },
      {
        platform: "Clutch",
        dot: "bg-orange-500",
        terms: ["Motion Graphics Company", "Animation Studio", "Creative Agency", "Branding Agency", "Video Production Company"],
        tip: "Goldmine — these companies already have clients. They need execution.",
      },
      {
        platform: "Behance",
        dot: "bg-sky-500",
        terms: ["Agency", "Studio", "Creative Studio", "Motion Studio"],
        tip: "Look for active recent projects — it signals they're currently shipping work.",
      },
      {
        platform: "X (Twitter)",
        dot: "bg-slate-300",
        terms: ["agency owner", "creative studio", "design agency", "branding studio"],
        quotedTerms: ["agency owner", "creative studio", "we're hiring designers", "looking for freelancers"],
      },
      {
        platform: "SaaS Marketing Agencies (Sub-niche)",
        dot: "bg-emerald-500",
        terms: ["SaaS marketing agency", "SaaS growth agency", "SaaS creative agency", "B2B SaaS marketing"],
        tip: "One of the best niches. They constantly need product animations, ad creatives, and explainers.",
      },
    ] as PlatformSection[],
  },
  {
    id: "saas",
    label: "Tier 2",
    sublabel: "Funded SaaS",
    color: "text-indigo-400",
    activeBg: "bg-indigo-500/20 border-indigo-500/40 text-indigo-300",
    inactiveBorder: "border-slate-700 text-slate-400",
    tagline: "Highest-ticket projects — companies with budget allocated and a launch deadline",
    sections: [
      {
        platform: "Crunchbase",
        dot: "bg-orange-400",
        terms: ["Seed startups", "Series A startups", "Series B startups"],
        filters: ["Raised in last 12 months"],
        tip: "Post-raise = they have budget and are building the marketing machine right now.",
      },
      {
        platform: "LinkedIn — Roles to Target",
        dot: "bg-blue-500",
        terms: ["Head of Marketing", "Growth Marketing Manager", "Product Marketing Manager"],
        filters: ["SaaS", "AI", "Fintech", "Cybersecurity", "Developer Tools"],
        tip: "These are the people with both the budget and the problem. Not founders.",
      },
      {
        platform: "Product Hunt",
        dot: "bg-rose-400",
        terms: ["AI", "Productivity", "Cybersecurity", "B2B"],
        tip: "Recent launches need launch videos, demo videos, and feature animations. Perfect timing.",
      },
      {
        platform: "X — Signal Keywords",
        dot: "bg-slate-300",
        quotedTerms: ["just launched", "launching today", "shipping", "product update", "new feature"],
        terms: [],
        tip: "Anyone constantly shipping product needs visuals to match the velocity.",
      },
      {
        platform: "Cybersecurity SaaS (Sub-niche)",
        dot: "bg-green-500",
        terms: ["Security platform", "SOC", "Threat detection", "Vulnerability management", "IAM", "DevSecOps"],
        tip: "Most cyber products are extremely hard to explain. Motion design solves this directly.",
      },
      {
        platform: "AI SaaS (Sub-niche)",
        dot: "bg-purple-500",
        terms: ["AI startup", "AI tool", "AI workflow", "AI platform"],
        tip: "Most AI founders can't explain their product visually. This is a massive gap.",
      },
      {
        platform: "Fintech (Sub-niche)",
        dot: "bg-cyan-500",
        terms: ["payments", "banking", "finance platform", "accounting software"],
        tip: "Fintech spends heavily on marketing and has compliance-approved budgets for it.",
      },
    ] as PlatformSection[],
  },
  {
    id: "creators",
    label: "Tier 3",
    sublabel: "Creator Businesses",
    color: "text-violet-400",
    activeBg: "bg-violet-500/20 border-violet-500/40 text-violet-300",
    inactiveBorder: "border-slate-700 text-slate-400",
    tagline: "Not influencers — businesses. Check if they're selling something.",
    sections: [
      {
        platform: "X (Twitter)",
        dot: "bg-slate-300",
        terms: ["newsletter", "cohort", "community", "masterclass", "course creator", "consultant", "coach"],
      },
      {
        platform: "LinkedIn",
        dot: "bg-blue-500",
        terms: ["Founder + newsletter", "Coach", "Consultant", "Educator"],
        tip: "Check their profile. Do they sell something? If yes: potential client.",
      },
      {
        platform: "YouTube",
        dot: "bg-red-500",
        terms: ["creator with course", "creator with community", "creator with membership"],
        tip: "Look in the description. Selling = budget. No selling = skip.",
      },
      {
        platform: "Best Niches to Search",
        dot: "bg-amber-400",
        terms: ["investing", "business", "entrepreneurship", "AI", "productivity", "psychology"],
        tip: "These niches monetize well — the creators here have the budget for premium video.",
      },
    ] as PlatformSection[],
  },
  {
    id: "hiring",
    label: "Tier 4",
    sublabel: "Hiring Boards",
    color: "text-emerald-400",
    activeBg: "bg-emerald-500/20 border-emerald-500/40 text-emerald-300",
    inactiveBorder: "border-slate-700 text-slate-400",
    tagline: "Most underrated method — a job post means budget is allocated right now",
    sections: [
      {
        platform: "LinkedIn Jobs",
        dot: "bg-blue-500",
        terms: ["Motion Designer", "Animator", "Motion Graphics Designer", "Video Editor", "Creative Designer"],
      },
      {
        platform: "Indeed",
        dot: "bg-indigo-400",
        terms: ["Motion Designer", "Animator", "Motion Graphics Designer", "Video Editor", "Creative Designer"],
      },
      {
        platform: "Wellfound (AngelList)",
        dot: "bg-slate-400",
        terms: ["motion designer", "visual designer", "creative designer"],
        tip: "Startup hiring boards. These companies move fast and often prefer contractors to start.",
      },
    ] as PlatformSection[],
  },
];

const DAILY_STACK = [
  {
    time: "Morning",
    icon: Sun,
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/30",
    platforms: ["LinkedIn"],
    searches: ["Motion Design Agency", "Creative Studio", "SaaS Marketing Agency"],
    target: "Collect 20 leads",
  },
  {
    time: "Afternoon",
    icon: Coffee,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10 border-indigo-500/30",
    platforms: ["Crunchbase", "Product Hunt"],
    searches: ["Seed", "Series A"],
    target: "Collect 10 leads",
  },
  {
    time: "Evening",
    icon: Moon,
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/30",
    platforms: ["Past clients", "Warm network"],
    searches: [],
    target: "Contact 5 people",
  },
];

// ── Main Component ─────────────────────────────────────────────────
export function LeadHuntingClient() {
  const [activeTab, setActiveTab] = useState("agencies");

  const activeTier = TIERS.find((t) => t.id === activeTab);

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-5">

        {/* Golden Rule Card */}
        <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 flex gap-4">
          <div className="shrink-0 mt-0.5">
            <Star className="h-5 w-5 text-amber-400" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-amber-300">The single most important search term</p>
            <p className="text-sm text-slate-300 leading-relaxed">
              Search LinkedIn for <span className="font-bold text-amber-300">"Creative Director"</span>, <span className="font-bold text-amber-300">"Design Director"</span>, <span className="font-bold text-amber-300">"Art Director"</span>, and <span className="font-bold text-amber-300">"Head of Creative"</span> — not founders. Creative Directors buy motion work every single week. They can say <em>"We need help. Start Monday."</em> without asking 7 other people for permission.
            </p>
          </div>
          <div className="shrink-0 flex gap-2 flex-col items-end">
            {["Creative Director", "Design Director", "Art Director", "Head of Creative"].map((t) => (
              <button
                key={t}
                onClick={() => { navigator.clipboard.writeText(t); toast.success("Copied"); }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-amber-500/40 bg-amber-500/10 text-amber-300 text-xs font-medium hover:bg-amber-500/20 transition-colors group"
              >
                <span className="font-mono">{t}</span>
                <Copy className="h-3 w-3 opacity-60 group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>

        {/* Tier Tabs */}
        <div className="flex gap-2 flex-wrap">
          {TIERS.map((tier) => (
            <button
              key={tier.id}
              onClick={() => setActiveTab(tier.id)}
              className={cn(
                "px-4 py-2 rounded-lg border text-sm font-medium transition-colors",
                activeTab === tier.id ? tier.activeBg : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300",
              )}
            >
              <span className="font-bold">{tier.label}</span>
              <span className="ml-1.5 opacity-80">— {tier.sublabel}</span>
            </button>
          ))}
          <button
            onClick={() => setActiveTab("daily")}
            className={cn(
              "px-4 py-2 rounded-lg border text-sm font-medium transition-colors",
              activeTab === "daily"
                ? "bg-rose-500/20 border-rose-500/40 text-rose-300"
                : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300",
            )}
          >
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Daily Stack</span>
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={cn(
              "px-4 py-2 rounded-lg border text-sm font-medium transition-colors",
              activeTab === "past"
                ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
                : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-300",
            )}
          >
            <span>Tier 5 — Past Clients</span>
          </button>
        </div>

        {/* Tier Content */}
        {activeTier && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className={cn("text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border", activeTier.activeBg)}>{activeTier.label}</span>
              <p className="text-sm text-slate-400">{activeTier.tagline}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {activeTier.sections.map((section) => (
                <PlatformBlock key={section.platform} block={section} />
              ))}
            </div>
          </div>
        )}

        {/* Daily Stack */}
        {activeTab === "daily" && (
          <div className="space-y-4">
            <p className="text-sm text-slate-400">If you were trying to get to $5k ASAP — this is the daily sequence.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {DAILY_STACK.map((block) => {
                const Icon = block.icon;
                return (
                  <div key={block.time} className={cn("rounded-xl border p-5 space-y-4", block.bg)}>
                    <div className="flex items-center gap-2">
                      <Icon className={cn("h-5 w-5", block.color)} />
                      <span className={cn("text-base font-bold", block.color)}>{block.time}</span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Platforms</p>
                      <div className="flex flex-wrap gap-1.5">
                        {block.platforms.map((p) => (
                          <span key={p} className="px-2 py-0.5 rounded bg-slate-800/80 text-xs text-slate-300 border border-slate-700">{p}</span>
                        ))}
                      </div>
                    </div>
                    {block.searches.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Search terms</p>
                        <div className="flex flex-wrap gap-2">
                          {block.searches.map((s) => <Chip key={s} label={s} />)}
                        </div>
                      </div>
                    )}
                    <div className={cn("mt-2 rounded-lg px-3 py-2 text-sm font-semibold", block.bg)}>
                      <span className="text-slate-300">Target: </span>
                      <span className={block.color}>{block.target}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* The system */}
            <div className="rounded-xl border border-slate-700/40 bg-slate-800/20 p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-indigo-400" />
                <span className="text-sm font-semibold text-slate-200">The compounding principle</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { n: "20", label: "LinkedIn leads/morning", color: "text-amber-400" },
                  { n: "10", label: "Crunchbase leads/afternoon", color: "text-indigo-400" },
                  { n: "5", label: "warm contacts/evening", color: "text-violet-400" },
                ].map(({ n, label, color }) => (
                  <div key={label} className="rounded-lg bg-slate-900/60 border border-slate-700/40 p-3">
                    <p className={cn("text-2xl font-bold", color)}>{n}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                35 touches/day × 5 days = 175 leads/week. Even at 2% conversion that's 3–4 conversations per week.
                Most freelancers send 3–4 DMs per week total.
              </p>
            </div>
          </div>
        )}

        {/* Past Clients */}
        {activeTab === "past" && (
          <div className="space-y-4">
            <p className="text-sm text-slate-400">The easiest money. Most freelancers forget to mine it.</p>

            <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-5 space-y-3">
              <p className="text-sm font-semibold text-blue-300">Spreadsheet columns to build</p>
              <div className="flex flex-wrap gap-2">
                {["Company", "Contact name", "Last project", "Potential next need", "Last contact date"].map((col) => (
                  <button
                    key={col}
                    onClick={() => { navigator.clipboard.writeText(col); toast.success("Copied"); }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm hover:bg-blue-500/20 transition-colors group"
                  >
                    <span className="font-mono text-xs">{col}</span>
                    <Copy className="h-3 w-3 opacity-50 group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-700/40 bg-slate-800/20 p-4 space-y-3">
                <p className="text-sm font-semibold text-slate-200">Reactivation message angles</p>
                <ul className="space-y-2 text-sm text-slate-400">
                  {[
                    "\"Hey, I'm opening up 2 spots next month — wanted to check if you had any upcoming projects.\"",
                    "\"I just shipped something that reminded me of your brand — thought you'd like to see it.\"",
                    "\"Working on a similar project to what we did together — had a few ideas for [their company].\"",
                    "\"We worked together on [project]. I've leveled up since then — happy to show you what's new.\"",
                  ].map((msg, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <span className="mt-0.5 shrink-0 h-4 w-4 rounded-full bg-blue-500/20 text-blue-400 text-[10px] flex items-center justify-center font-bold">{i + 1}</span>
                      <button
                        onClick={() => { navigator.clipboard.writeText(msg.replace(/^"|"$/g, "")); toast.success("Copied"); }}
                        className="text-left text-xs text-slate-400 italic hover:text-slate-300 transition-colors"
                      >
                        {msg}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-slate-700/40 bg-slate-800/20 p-4 space-y-3">
                <p className="text-sm font-semibold text-slate-200">Cadence to follow</p>
                <ul className="space-y-3 text-sm text-slate-400">
                  {[
                    { when: "Monthly", action: "Check in with top 5 past clients" },
                    { when: "When you ship something new", action: "Send to anyone who'd appreciate the style" },
                    { when: "When they post about a launch", action: "Reach out immediately — they need visuals now" },
                    { when: "Every 3 months", action: "Audit the spreadsheet and add new columns" },
                  ].map(({ when, action }) => (
                    <li key={when} className="flex flex-col gap-0.5">
                      <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-wide">{when}</span>
                      <span className="text-xs text-slate-400">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
