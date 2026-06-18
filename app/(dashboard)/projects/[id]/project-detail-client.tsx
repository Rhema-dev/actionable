"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate, getDaysUntil, cn } from "@/lib/utils";
import type { Project, ProjectStatus, ProjectType } from "@/types/database";
import { ArrowLeft, Minus, Plus, CheckCircle2, DollarSign, Clock, FileText } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const STATUS_STEPS: Record<string, number> = {
  "Scoping": 1, "In Progress": 2, "Client Review": 3, "Revisions": 4, "Completed": 5, "Cancelled": 0,
};
const STATUS_COLORS: Record<string, any> = {
  "Scoping": "gray", "In Progress": "indigo", "Client Review": "violet",
  "Revisions": "amber", "Completed": "success", "Cancelled": "danger",
};
const STATUSES: ProjectStatus[] = ["Scoping", "In Progress", "Client Review", "Revisions", "Completed", "Cancelled"];
const TYPES: ProjectType[] = ["Launch Video", "Explainer", "Onboarding Series", "VSL", "Demo", "Custom"];

export function ProjectDetailClient({ project: initialProject, userId }: { project: Project; userId: string }) {
  const router = useRouter();
  const [project, setProject] = useState<Project>(initialProject);
  const [notes, setNotes] = useState(project.notes ?? "");
  const [savingNotes, setSavingNotes] = useState(false);

  const update = async (payload: Partial<Project>) => {
    const supabase = createClient();
    const { data, error } = await supabase.from("projects").update(payload).eq("id", project.id).select().single();
    if (error) { toast.error(error.message); return; }
    setProject(data);
    return data;
  };

  const markDepositPaid = async () => {
    if (project.deposit_paid) return;
    const supabase = createClient();
    const today = new Date().toISOString().split("T")[0];
    await supabase.from("income").insert({
      user_id: userId, project_id: project.id,
      amount: project.deposit_amount || project.price * 0.5,
      date: today, payment_type: "Deposit",
      description: `Deposit — ${project.client_name}`,
    });
    await update({ deposit_paid: true, deposit_paid_date: today });
    toast.success("Deposit marked as paid & logged to income!");
  };

  const markFinalPaid = async () => {
    if (project.final_paid) return;
    const supabase = createClient();
    const today = new Date().toISOString().split("T")[0];
    const remaining = project.price - (project.deposit_amount || 0);
    await supabase.from("income").insert({
      user_id: userId, project_id: project.id,
      amount: remaining > 0 ? remaining : project.price,
      date: today, payment_type: "Final Payment",
      description: `Final payment — ${project.client_name}`,
    });
    await update({ final_paid: true, final_paid_date: today, status: "Completed" });
    toast.success("🎉 Final payment received & project marked complete!");
  };

  const saveNotes = async () => {
    setSavingNotes(true);
    await update({ notes });
    toast.success("Notes saved");
    setSavingNotes(false);
  };

  const days = project.deadline ? getDaysUntil(project.deadline) : null;
  const step = STATUS_STEPS[project.status] ?? 0;
  const remaining = project.price - (project.deposit_paid ? (project.deposit_amount || 0) : 0);

  return (
    <div className="flex-1 overflow-auto p-4 md:p-6 space-y-6">
      {/* Back */}
      <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200">
        <ArrowLeft className="h-4 w-4" /> Back to Projects
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">{project.client_name}</h2>
          {project.client_x_handle && <p className="text-slate-500">@{project.client_x_handle}</p>}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant={STATUS_COLORS[project.status]} className="text-sm px-3 py-1">{project.status}</Badge>
          {days !== null && project.status !== "Completed" && (
            <span className={cn("text-sm font-medium", days < 0 ? "text-red-400" : days <= 3 ? "text-amber-400" : "text-slate-400")}>
              {days < 0 ? `${Math.abs(days)}d overdue` : days === 0 ? "Due today" : `${days} days left`}
            </span>
          )}
        </div>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="pt-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-slate-300">Project Progress</p>
            <span className="text-sm text-slate-400">{project.status}</span>
          </div>
          <Progress value={step} max={5} barClassName="bg-violet-500" className="h-2.5" />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1.5">
            {["Scoping", "In Progress", "Client Review", "Revisions", "Completed"].map((s) => (
              <span key={s} className={cn(project.status === s && "text-violet-400 font-medium")}>{s}</span>
            ))}
          </div>
          <div className="mt-4">
            <Select value={project.status} onChange={(e) => update({ status: e.target.value as ProjectStatus })}>
              {STATUSES.map((s) => <option key={s}>{s}</option>)}
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Financials */}
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><DollarSign className="h-4 w-4 text-emerald-400" />Financials</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between"><span className="text-sm text-slate-500">Total Price</span><span className="text-sm font-bold text-emerald-400">{formatCurrency(project.price)}</span></div>
            <div className="flex justify-between"><span className="text-sm text-slate-500">Deposit</span><span className="text-sm text-slate-300">{formatCurrency(project.deposit_amount)}</span></div>
            <div className="flex justify-between"><span className="text-sm text-slate-500">Remaining</span><span className="text-sm text-slate-300">{formatCurrency(remaining)}</span></div>
            <div className="pt-2 space-y-2">
              <Button
                variant={project.deposit_paid ? "success" : "default"}
                size="sm"
                className="w-full"
                onClick={markDepositPaid}
                disabled={project.deposit_paid}
              >
                {project.deposit_paid ? <><CheckCircle2 className="h-3.5 w-3.5 mr-1" />Deposit Paid {project.deposit_paid_date && `— ${formatDate(project.deposit_paid_date)}`}</> : "Mark Deposit Paid"}
              </Button>
              <Button
                variant={project.final_paid ? "success" : "default"}
                size="sm"
                className="w-full"
                onClick={markFinalPaid}
                disabled={project.final_paid}
              >
                {project.final_paid ? <><CheckCircle2 className="h-3.5 w-3.5 mr-1" />Fully Paid {project.final_paid_date && `— ${formatDate(project.final_paid_date)}`}</> : "Mark Final Payment"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Clock className="h-4 w-4 text-blue-400" />Timeline</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-500">Start Date</label>
              <Input type="date" value={project.start_date ?? ""} onChange={(e) => update({ start_date: e.target.value || null })} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-slate-500">Deadline</label>
              <Input type="date" value={project.deadline ?? ""} onChange={(e) => update({ deadline: e.target.value || null })} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-slate-500">Video Length (sec)</label>
              <Input type="number" value={project.video_length_seconds ?? ""} onChange={(e) => update({ video_length_seconds: e.target.value ? parseInt(e.target.value) : null })} />
            </div>
          </CardContent>
        </Card>

        {/* Revisions */}
        <Card>
          <CardHeader><CardTitle>Revisions</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-6 py-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => update({ revision_count: Math.max(0, project.revision_count - 1) })}
                disabled={project.revision_count <= 0}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="text-center">
                <p className="text-4xl font-bold text-slate-100">{project.revision_count}</p>
                <p className="text-xs text-slate-500">of {project.max_revisions} max</p>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => update({ revision_count: project.revision_count + 1 })}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {project.revision_count >= project.max_revisions && (
              <p className="text-xs text-amber-400 text-center">Max revisions reached — additional revisions are billable</p>
            )}
            <div className="mt-3 space-y-1.5">
              <label className="text-xs text-slate-500">Max Revisions</label>
              <Input
                type="number"
                value={project.max_revisions}
                onChange={(e) => update({ max_revisions: parseInt(e.target.value) || 2 })}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Deliverables & Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><FileText className="h-4 w-4 text-slate-400" />Deliverables</CardTitle></CardHeader>
          <CardContent>
            <textarea
              value={project.deliverables ?? ""}
              onChange={(e) => update({ deliverables: e.target.value })}
              placeholder="List what you're delivering…"
              className="flex min-h-[100px] w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Notes</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Internal notes, passwords, feedback…"
              className="flex min-h-[100px] w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
            <Button variant="outline" size="sm" onClick={saveNotes} disabled={savingNotes}>
              {savingNotes ? "Saving…" : "Save Notes"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
