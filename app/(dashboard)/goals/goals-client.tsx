"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet } from "@/components/ui/sheet";
import { Dialog } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { FormField } from "@/components/ui/form-field";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import type { Goal, GoalType, GoalPeriod, GoalStatus } from "@/types/database";
import { Plus, Target, Trash2, Edit2, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";

const TYPES: GoalType[] = ["Revenue", "Leads", "Posts", "Projects", "DMs Sent", "Replies", "Custom"];
const PERIODS: GoalPeriod[] = ["Daily", "Weekly", "Monthly", "Quarterly", "Custom"];
const STATUS_VARIANT: Record<GoalStatus, any> = { Active: "indigo", Completed: "success", Failed: "danger", Paused: "gray" };

const QUICK_TEMPLATES = [
  { title: "20 DMs/day this week", goal_type: "DMs Sent" as GoalType, target_value: 20, period: "Daily" as GoalPeriod },
  { title: "$3,000 this month", goal_type: "Revenue" as GoalType, target_value: 3000, period: "Monthly" as GoalPeriod },
  { title: "5 posts per week", goal_type: "Posts" as GoalType, target_value: 5, period: "Weekly" as GoalPeriod },
  { title: "25 leads this week", goal_type: "Leads" as GoalType, target_value: 25, period: "Weekly" as GoalPeriod },
  { title: "2 projects this month", goal_type: "Projects" as GoalType, target_value: 2, period: "Monthly" as GoalPeriod },
];

const EMPTY_FORM = {
  title: "", description: "", goal_type: "Custom" as GoalType,
  target_value: "", period: "Monthly" as GoalPeriod,
  start_date: format(new Date(), "yyyy-MM-dd"), end_date: "",
};

interface GoalsClientProps { initialGoals: Goal[]; userId: string; }

export function GoalsClient({ initialGoals, userId }: GoalsClientProps) {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [showSheet, setShowSheet] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState<Goal | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [updateValue, setUpdateValue] = useState("");
  const [saving, setSaving] = useState(false);

  const active = goals.filter((g) => g.status === "Active");
  const completed = goals.filter((g) => g.status !== "Active");

  const handleSave = async () => {
    if (!form.title || !form.target_value) { toast.error("Title and target required"); return; }
    setSaving(true);
    const supabase = createClient();
    const { data, error } = await supabase.from("goals").insert({
      user_id: userId, title: form.title, description: form.description || null,
      goal_type: form.goal_type, target_value: parseFloat(form.target_value),
      period: form.period, start_date: form.start_date, end_date: form.end_date || null,
      status: "Active",
    }).select().single();
    if (error) { toast.error(error.message); } else {
      setGoals((p) => [data, ...p]); toast.success("Goal created!"); setShowSheet(false); setForm(EMPTY_FORM);
    }
    setSaving(false);
  };

  const quickAdd = async (template: typeof QUICK_TEMPLATES[0]) => {
    const supabase = createClient();
    const { data } = await supabase.from("goals").insert({
      user_id: userId, ...template, description: null,
      start_date: format(new Date(), "yyyy-MM-dd"), status: "Active",
    }).select().single();
    if (data) { setGoals((p) => [data, ...p]); toast.success(`Goal added: ${template.title}`); }
  };

  const updateProgress = async () => {
    if (!showUpdateModal || !updateValue) return;
    const supabase = createClient();
    const newVal = parseFloat(updateValue);
    const newStatus: GoalStatus = newVal >= showUpdateModal.target_value ? "Completed" : "Active";
    const { data } = await supabase.from("goals").update({ current_value: newVal, status: newStatus }).eq("id", showUpdateModal.id).select().single();
    if (data) {
      setGoals((p) => p.map((g) => g.id === data.id ? data : g));
      if (newStatus === "Completed") toast.success("🎉 Goal completed!");
      else toast.success("Progress updated");
    }
    setShowUpdateModal(null);
    setUpdateValue("");
  };

  const deleteGoal = async (id: string) => {
    const supabase = createClient();
    await supabase.from("goals").delete().eq("id", id);
    setGoals((p) => p.filter((g) => g.id !== id));
    toast.success("Goal removed");
  };

  const GoalCard = ({ goal }: { goal: Goal }) => {
    const pct = Math.min(100, Math.round((goal.current_value / goal.target_value) * 100));
    const isRevenue = goal.goal_type === "Revenue";
    return (
      <Card className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-200 truncate">{goal.title}</p>
            {goal.description && <p className="text-xs text-slate-500 truncate">{goal.description}</p>}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Badge variant={STATUS_VARIANT[goal.status]}>{goal.status}</Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="indigo">{goal.goal_type}</Badge>
          <Badge variant="gray">{goal.period}</Badge>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-slate-400">
              {isRevenue ? formatCurrency(goal.current_value) : goal.current_value} / {isRevenue ? formatCurrency(goal.target_value) : goal.target_value}
            </span>
            <span className="font-bold text-indigo-400">{pct}%</span>
          </div>
          <Progress value={goal.current_value} max={goal.target_value} barClassName={pct >= 100 ? "bg-emerald-500" : "bg-indigo-500"} />
        </div>
        {goal.end_date && <p className="text-xs text-slate-500">Ends: {formatDate(goal.end_date)}</p>}
        <div className="flex gap-2">
          {goal.status === "Active" && (
            <Button size="sm" variant="outline" className="flex-1 text-xs h-7" onClick={() => { setShowUpdateModal(goal); setUpdateValue(goal.current_value.toString()); }}>
              Update Progress
            </Button>
          )}
          <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => deleteGoal(goal.id)}>
            <Trash2 className="h-3.5 w-3.5 text-slate-500 hover:text-red-400" />
          </Button>
        </div>
      </Card>
    );
  };

  return (
    <div className="flex-1 overflow-auto p-4 md:p-6 space-y-6">
      {/* Quick add templates */}
      <div>
        <p className="text-xs text-slate-500 mb-2">Quick-add templates</p>
        <div className="flex flex-wrap gap-2">
          {QUICK_TEMPLATES.map((t) => (
            <button key={t.title} onClick={() => quickAdd(t)} className="text-xs px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition-colors">
              + {t.title}
            </button>
          ))}
          <Button size="sm" onClick={() => setShowSheet(true)} className="gap-1 rounded-full h-8">
            <Plus className="h-3 w-3" /> Custom Goal
          </Button>
        </div>
      </div>

      {/* Active goals */}
      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Active Goals ({active.length})</h3>
        {active.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 gap-2 rounded-xl border border-dashed border-slate-700">
            <Target className="h-8 w-8 text-slate-700" />
            <p className="text-sm text-slate-500">No active goals — add one above</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {active.map((g) => <GoalCard key={g.id} goal={g} />)}
          </div>
        )}
      </div>

      {/* Completed */}
      {completed.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-500 mb-3">Completed / Paused ({completed.length})</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 opacity-60">
            {completed.slice(0, 10).map((g) => <GoalCard key={g.id} goal={g} />)}
          </div>
        </div>
      )}

      {/* Create Goal Sheet */}
      <Sheet open={showSheet} onClose={() => setShowSheet(false)} title="Create Goal">
        <div className="space-y-4">
          <FormField label="Goal Title" required>
            <Input placeholder="$3,000 in revenue this month" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
          </FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Type">
              <Select value={form.goal_type} onChange={(e) => setForm((f) => ({ ...f, goal_type: e.target.value as GoalType }))}>
                {TYPES.map((t) => <option key={t}>{t}</option>)}
              </Select>
            </FormField>
            <FormField label="Period">
              <Select value={form.period} onChange={(e) => setForm((f) => ({ ...f, period: e.target.value as GoalPeriod }))}>
                {PERIODS.map((p) => <option key={p}>{p}</option>)}
              </Select>
            </FormField>
          </div>
          <FormField label="Target Value" required>
            <Input type="number" placeholder="3000" value={form.target_value} onChange={(e) => setForm((f) => ({ ...f, target_value: e.target.value }))} />
          </FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Start Date">
              <Input type="date" value={form.start_date} onChange={(e) => setForm((f) => ({ ...f, start_date: e.target.value }))} />
            </FormField>
            <FormField label="End Date">
              <Input type="date" value={form.end_date} onChange={(e) => setForm((f) => ({ ...f, end_date: e.target.value }))} />
            </FormField>
          </div>
          <FormField label="Description">
            <Input placeholder="Optional context" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
          </FormField>
          <Button onClick={handleSave} disabled={saving} className="w-full">{saving ? "Saving…" : "Create Goal"}</Button>
        </div>
      </Sheet>

      {/* Update Progress Modal */}
      <Dialog open={!!showUpdateModal} onClose={() => setShowUpdateModal(null)} title={`Update: ${showUpdateModal?.title}`} size="sm">
        <div className="space-y-4">
          <p className="text-sm text-slate-400">
            Target: <span className="text-slate-200 font-medium">{showUpdateModal?.goal_type === "Revenue" ? formatCurrency(showUpdateModal.target_value) : showUpdateModal?.target_value}</span>
          </p>
          <FormField label="Current Value">
            <Input type="number" value={updateValue} onChange={(e) => setUpdateValue(e.target.value)} placeholder="Enter current progress" />
          </FormField>
          <Button onClick={updateProgress} className="w-full">Update Progress</Button>
        </div>
      </Dialog>
    </div>
  );
}
