"use client";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { FormField } from "@/components/ui/form-field";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { SavingsGoal, Expense } from "@/types/database";
import { Monitor, Plus, Zap, ChevronDown, ChevronUp } from "lucide-react";
import confetti from "canvas-confetti";

interface PCFundClientProps {
  goal: SavingsGoal | null;
  contributions: Expense[];
  userId: string;
}

const PC_SPECS = `Target Build:
• CPU: AMD Ryzen 9 9900X
• GPU: NVIDIA RTX 5070 Ti
• RAM: 64GB DDR5 6000MHz
• Storage: 2TB NVMe PCIe 5.0
• Cooling: 360mm AIO
• Case: Lian Li O11 Air

Why this build:
→ Smooth 4K After Effects previews
→ Fast Blender GPU renders
→ No more proxy workflow
→ Real-time 4K playback`;

export function PCFundClient({ goal: initialGoal, contributions, userId }: PCFundClientProps) {
  const [goal, setGoal] = useState<SavingsGoal | null>(initialGoal);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSpecsExpanded, setShowSpecsExpanded] = useState(false);
  const [addAmount, setAddAmount] = useState("");
  const [addSource, setAddSource] = useState("From Project");
  const [saving, setSaving] = useState(false);
  const prevPct = useRef(0);

  const current = goal?.current_amount ?? 0;
  const target = goal?.target_amount ?? 3000;
  const pct = Math.min(100, Math.round((current / target) * 100));
  const remaining = Math.max(0, target - current);

  // Confetti on milestones
  useEffect(() => {
    const milestones = [25, 50, 75, 100];
    const hit = milestones.find((m) => pct >= m && prevPct.current < m);
    if (hit) {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ["#6366f1", "#8b5cf6", "#fbbf24", "#10b981"] });
      toast.success(`🎉 ${hit}% milestone reached! Keep going!`, { duration: 5000 });
    }
    prevPct.current = pct;
  }, [pct]);

  const addToFund = async () => {
    if (!addAmount) { toast.error("Enter an amount"); return; }
    setSaving(true);
    const supabase = createClient();

    if (!goal) {
      const { data: newGoal } = await supabase.from("savings_goals").insert({
        user_id: userId, goal_name: "New PC Build",
        description: "Building toward the new setup", target_amount: 3000,
        current_amount: parseFloat(addAmount),
      }).select().single();
      if (newGoal) setGoal(newGoal);
    } else {
      const newAmount = current + parseFloat(addAmount);
      const { data } = await supabase.from("savings_goals").update({ current_amount: newAmount, status: newAmount >= target ? "Completed" : "Active" }).eq("id", goal.id).select().single();
      if (data) setGoal(data);
    }

    // Log as expense with pc_fund flag
    await supabase.from("expenses").insert({
      user_id: userId, amount: parseFloat(addAmount),
      category: "PC Fund", description: `PC Fund contribution — ${addSource}`,
      date: new Date().toISOString().split("T")[0], is_pc_fund_contribution: true,
    });

    toast.success(`${formatCurrency(parseFloat(addAmount))} added to PC Fund!`);
    setShowAddModal(false);
    setAddAmount("");
    setSaving(false);
  };

  const updateGoalField = async (field: "goal_name" | "target_amount" | "deadline", value: string | number) => {
    if (!goal) return;
    const supabase = createClient();
    const { data } = await supabase.from("savings_goals").update({ [field]: value }).eq("id", goal.id).select().single();
    if (data) setGoal(data);
  };

  const circumference = 2 * Math.PI * 80;
  const strokeDash = circumference - (pct / 100) * circumference;

  const weeksToGoal = (() => {
    const totalContributed = contributions.reduce((s, c) => s + c.amount, 0);
    const weeks = contributions.length > 0
      ? Math.ceil(contributions.length / 1)  // rough weeks of data
      : 1;
    const weeklyRate = totalContributed / Math.max(weeks, 1);
    return weeklyRate > 0 ? Math.ceil(remaining / weeklyRate) : null;
  })();

  return (
    <div className="flex-1 overflow-auto p-4 md:p-6 space-y-6">
      {/* Hero */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-br from-indigo-900/30 via-violet-900/20 to-amber-900/20 p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Ring */}
            <div className="relative shrink-0">
              <svg width="200" height="200" className="-rotate-90">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#1e2433" strokeWidth="12" />
                <circle
                  cx="100" cy="100" r="80" fill="none"
                  stroke={pct >= 100 ? "#10b981" : pct >= 75 ? "#f59e0b" : "#6366f1"}
                  strokeWidth="12"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDash}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 1s ease" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Monitor className="h-8 w-8 text-indigo-400 mb-2" />
                <span className="text-4xl font-black text-white">{pct}%</span>
                <span className="text-sm text-slate-400">there!</span>
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <h2 className="text-3xl font-black text-white">{formatCurrency(current)}</h2>
                <p className="text-slate-400">of <span className="text-amber-400 font-semibold">{formatCurrency(target)}</span> goal</p>
                <p className="text-lg font-semibold text-slate-300 mt-1">{formatCurrency(remaining)} remaining</p>
              </div>

              {weeksToGoal && (
                <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3">
                  <p className="text-sm text-slate-300">At your current pace, you&apos;ll get there in <span className="text-amber-400 font-bold">~{weeksToGoal} weeks</span></p>
                </div>
              )}

              <Button onClick={() => setShowAddModal(true)} className="gap-2 bg-amber-600 hover:bg-amber-500">
                <Plus className="h-4 w-4" /> Add to Fund
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Goal Settings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-5 space-y-2">
            <label className="text-xs text-slate-500">Goal Name</label>
            <Input
              defaultValue={goal?.goal_name ?? "New PC Build"}
              onBlur={(e) => updateGoalField("goal_name", e.target.value)}
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 space-y-2">
            <label className="text-xs text-slate-500">Target Amount ($)</label>
            <Input
              type="number"
              defaultValue={target}
              onBlur={(e) => updateGoalField("target_amount", parseFloat(e.target.value) || 3000)}
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 space-y-2">
            <label className="text-xs text-slate-500">Target Date</label>
            <Input
              type="date"
              defaultValue={goal?.deadline ?? ""}
              onBlur={(e) => updateGoalField("deadline", e.target.value)}
            />
          </CardContent>
        </Card>
      </div>

      {/* Contributions History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Contribution History</CardTitle>
            <Badge variant="amber">{contributions.length} contributions</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {contributions.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-6">No contributions yet — add your first!</p>
          ) : (
            <div className="space-y-2">
              {contributions.map((c) => (
                <div key={c.id} className="flex items-center justify-between py-2 border-b border-slate-700/30 last:border-0">
                  <div>
                    <p className="text-sm text-slate-300">{c.description}</p>
                    <p className="text-xs text-slate-500">{formatDate(c.date)}</p>
                  </div>
                  <span className="text-sm font-bold text-amber-400">+{formatCurrency(c.amount)}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* PC Specs */}
      <Card>
        <div
          className="flex items-center justify-between p-5 cursor-pointer"
          onClick={() => setShowSpecsExpanded((v) => !v)}
        >
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-amber-400" />
            <span className="text-sm font-semibold text-slate-200">Target PC Build Specs</span>
          </div>
          {showSpecsExpanded ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
        </div>
        {showSpecsExpanded && (
          <CardContent className="pt-0">
            <pre className="text-xs text-slate-400 whitespace-pre-wrap font-mono leading-relaxed">{PC_SPECS}</pre>
          </CardContent>
        )}
      </Card>

      {/* Add Modal */}
      <Dialog open={showAddModal} onClose={() => setShowAddModal(false)} title="Add to PC Fund">
        <div className="space-y-4">
          <FormField label="Amount ($)">
            <Input type="number" placeholder="250" value={addAmount} onChange={(e) => setAddAmount(e.target.value)} />
          </FormField>
          <FormField label="Source">
            <select value={addSource} onChange={(e) => setAddSource(e.target.value)} className="flex h-9 w-full appearance-none rounded-lg border border-slate-700 bg-slate-800/50 pl-3 pr-8 py-1 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              {["From Project", "Monthly Allocation", "Manual Deposit"].map((s) => <option key={s}>{s}</option>)}
            </select>
          </FormField>
          <Button onClick={addToFund} disabled={saving} className="w-full bg-amber-600 hover:bg-amber-500">
            {saving ? "Adding…" : `Add ${addAmount ? formatCurrency(parseFloat(addAmount)) : ""} to Fund`}
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
