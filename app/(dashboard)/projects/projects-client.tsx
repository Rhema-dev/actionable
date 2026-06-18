"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { Sheet } from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
import { FormField } from "@/components/ui/form-field";
import { Card } from "@/components/ui/card";
import { formatCurrency, formatDate, getDaysUntil, cn } from "@/lib/utils";
import type { Project, ProjectStatus, ProjectType } from "@/types/database";
import { Plus, LayoutGrid, List, CheckCircle2, Clock, DollarSign, Briefcase } from "lucide-react";
import Link from "next/link";

const STATUS_STEPS: Record<ProjectStatus, number> = {
  "Scoping": 1, "In Progress": 2, "Client Review": 3, "Revisions": 4, "Completed": 5, "Cancelled": 0,
};
const STATUS_COLORS: Record<string, any> = {
  "Scoping": "gray", "In Progress": "indigo", "Client Review": "violet",
  "Revisions": "amber", "Completed": "success", "Cancelled": "danger",
};
const STATUSES: ProjectStatus[] = ["Scoping", "In Progress", "Client Review", "Revisions", "Completed", "Cancelled"];
const TYPES: ProjectType[] = ["Launch Video", "Explainer", "Onboarding Series", "VSL", "Demo", "Custom"];

const EMPTY_FORM = {
  client_name: "", client_x_handle: "", lead_id: "", project_type: "Launch Video" as ProjectType,
  price: "", deposit_amount: "", start_date: "", deadline: "",
  video_length_seconds: "", max_revisions: "2", deliverables: "", notes: "",
};

interface ProjectsClientProps {
  initialProjects: Project[];
  leads: { id: string; x_handle: string; company: string | null }[];
  userId: string;
}

export function ProjectsClient({ initialProjects, leads, userId }: ProjectsClientProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [view, setView] = useState<"card" | "list">("card");
  const [showSheet, setShowSheet] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const active = projects.filter((p) => !["Completed", "Cancelled"].includes(p.status));
  const totalRevenue = projects.filter((p) => p.final_paid).reduce((s, p) => s + p.price, 0);

  const handleSave = async () => {
    if (!form.client_name.trim()) { toast.error("Client name required"); return; }
    setSaving(true);
    const supabase = createClient();
    const { data, error } = await supabase.from("projects").insert({
      user_id: userId,
      client_name: form.client_name,
      client_x_handle: form.client_x_handle || null,
      lead_id: form.lead_id || null,
      project_type: form.project_type,
      price: parseFloat(form.price) || 0,
      deposit_amount: parseFloat(form.deposit_amount) || 0,
      start_date: form.start_date || null,
      deadline: form.deadline || null,
      video_length_seconds: form.video_length_seconds ? parseInt(form.video_length_seconds) : null,
      max_revisions: parseInt(form.max_revisions) || 2,
      deliverables: form.deliverables || null,
      notes: form.notes || null,
      status: "Scoping",
    }).select().single();
    if (error) { toast.error(error.message); } else {
      setProjects((prev) => [data, ...prev]);
      toast.success("Project created!");
      setShowSheet(false);
      setForm(EMPTY_FORM);
    }
    setSaving(false);
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Stats */}
      <div className="flex items-center gap-6 px-4 md:px-6 py-3 border-b border-slate-700/40 bg-slate-800/20">
        {[
          { icon: Briefcase, label: "Active", value: active.length, color: "text-indigo-400" },
          { icon: CheckCircle2, label: "Completed", value: projects.filter((p) => p.status === "Completed").length, color: "text-emerald-400" },
          { icon: DollarSign, label: "Earned", value: formatCurrency(totalRevenue), color: "text-emerald-400" },
          { icon: Clock, label: "Pipeline", value: formatCurrency(active.reduce((s, p) => s + p.price, 0)), color: "text-amber-400" },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="flex items-center gap-1.5">
            <Icon className={cn("h-3.5 w-3.5", color)} />
            <span className="text-xs text-slate-500">{label}:</span>
            <span className={cn("text-xs font-semibold", color)}>{value}</span>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-slate-700/40">
        <div className="flex items-center gap-1 rounded-lg border border-slate-700 p-0.5">
          <button onClick={() => setView("card")} className={cn("px-3 py-1 rounded-md text-xs font-medium transition-colors", view === "card" ? "bg-slate-700 text-white" : "text-slate-400")}>
            <LayoutGrid className="h-3.5 w-3.5" />
          </button>
          <button onClick={() => setView("list")} className={cn("px-3 py-1 rounded-md text-xs font-medium transition-colors", view === "list" ? "bg-slate-700 text-white" : "text-slate-400")}>
            <List className="h-3.5 w-3.5" />
          </button>
        </div>
        <Button size="sm" onClick={() => setShowSheet(true)} className="gap-1">
          <Plus className="h-3.5 w-3.5" /> New Project
        </Button>
      </div>

      <div className="flex-1 overflow-auto p-4 md:p-6">
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-3">
            <Briefcase className="h-10 w-10 text-slate-700" />
            <p className="text-slate-500 text-sm">No projects yet</p>
            <Button size="sm" onClick={() => setShowSheet(true)}><Plus className="h-4 w-4 mr-1" />Create first project</Button>
          </div>
        ) : view === "card" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {projects.map((project) => {
              const days = project.deadline ? getDaysUntil(project.deadline) : null;
              const step = STATUS_STEPS[project.status] ?? 0;
              return (
                <Link key={project.id} href={`/projects/${project.id}`}>
                  <Card className="p-4 hover:border-slate-500 transition-colors cursor-pointer h-full flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-slate-200">{project.client_name}</p>
                        {project.client_x_handle && <p className="text-xs text-slate-500">@{project.client_x_handle}</p>}
                      </div>
                      <Badge variant={STATUS_COLORS[project.status]}>{project.status}</Badge>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="indigo">{project.project_type}</Badge>
                      {days !== null && project.status !== "Completed" && (
                        <span className={cn("text-xs", days < 0 ? "text-red-400" : days <= 3 ? "text-amber-400" : "text-slate-500")}>
                          {days < 0 ? `${Math.abs(days)}d overdue` : days === 0 ? "Due today" : `${days}d left`}
                        </span>
                      )}
                    </div>
                    <p className="text-xl font-bold text-emerald-400">{formatCurrency(project.price)}</p>
                    <div className="space-y-1.5">
                      <Progress value={step} max={5} barClassName="bg-violet-500" />
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>Scoping</span><span>In Progress</span><span>Done</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-auto">
                      {project.deposit_paid && <Badge variant="success" className="text-[10px]">Deposit ✓</Badge>}
                      {project.final_paid && <Badge variant="success" className="text-[10px]">Paid ✓</Badge>}
                      {!project.deposit_paid && <Badge variant="gray" className="text-[10px]">Deposit pending</Badge>}
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          <table className="w-full text-xs">
            <thead className="sticky top-0 bg-slate-900/95">
              <tr className="border-b border-slate-700/40">
                {["Client", "Type", "Price", "Status", "Deadline", "Deposit", "Paid"].map((h) => (
                  <th key={h} className="px-3 py-2.5 text-left font-medium text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => {
                const days = p.deadline ? getDaysUntil(p.deadline) : null;
                return (
                  <tr key={p.id} className="border-b border-slate-700/20 hover:bg-slate-800/30 cursor-pointer" onClick={() => window.location.href = `/projects/${p.id}`}>
                    <td className="px-3 py-2.5 font-medium text-slate-200">{p.client_name}</td>
                    <td className="px-3 py-2.5 text-slate-400">{p.project_type}</td>
                    <td className="px-3 py-2.5 text-emerald-400 font-medium">{formatCurrency(p.price)}</td>
                    <td className="px-3 py-2.5"><Badge variant={STATUS_COLORS[p.status]}>{p.status}</Badge></td>
                    <td className="px-3 py-2.5">
                      {p.deadline ? (
                        <span className={cn(days !== null && days < 0 ? "text-red-400" : days !== null && days <= 3 ? "text-amber-400" : "text-slate-400")}>
                          {formatDate(p.deadline)}
                        </span>
                      ) : "—"}
                    </td>
                    <td className="px-3 py-2.5">{p.deposit_paid ? <span className="text-emerald-400">✓</span> : <span className="text-slate-600">—</span>}</td>
                    <td className="px-3 py-2.5">{p.final_paid ? <span className="text-emerald-400">✓</span> : <span className="text-slate-600">—</span>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* New Project Sheet */}
      <Sheet open={showSheet} onClose={() => setShowSheet(false)} title="New Project" width="w-[520px]">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Client Name" required>
              <Input placeholder="Acme Corp" value={form.client_name} onChange={(e) => setForm((f) => ({ ...f, client_name: e.target.value }))} />
            </FormField>
            <FormField label="Client X Handle">
              <Input placeholder="@founder" value={form.client_x_handle} onChange={(e) => setForm((f) => ({ ...f, client_x_handle: e.target.value }))} />
            </FormField>
          </div>
          <FormField label="Project Type">
            <Select value={form.project_type} onChange={(e) => setForm((f) => ({ ...f, project_type: e.target.value as ProjectType }))}>
              {TYPES.map((t) => <option key={t}>{t}</option>)}
            </Select>
          </FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Price ($)" required>
              <Input type="number" placeholder="1500" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} />
            </FormField>
            <FormField label="Deposit Amount ($)">
              <Input type="number" placeholder="750" value={form.deposit_amount} onChange={(e) => setForm((f) => ({ ...f, deposit_amount: e.target.value }))} />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Start Date">
              <Input type="date" value={form.start_date} onChange={(e) => setForm((f) => ({ ...f, start_date: e.target.value }))} />
            </FormField>
            <FormField label="Deadline">
              <Input type="date" value={form.deadline} onChange={(e) => setForm((f) => ({ ...f, deadline: e.target.value }))} />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Video Length (sec)">
              <Input type="number" placeholder="60" value={form.video_length_seconds} onChange={(e) => setForm((f) => ({ ...f, video_length_seconds: e.target.value }))} />
            </FormField>
            <FormField label="Max Revisions">
              <Input type="number" placeholder="2" value={form.max_revisions} onChange={(e) => setForm((f) => ({ ...f, max_revisions: e.target.value }))} />
            </FormField>
          </div>
          <FormField label="From Lead">
            <Select value={form.lead_id} onChange={(e) => setForm((f) => ({ ...f, lead_id: e.target.value }))}>
              <option value="">— Not from a lead —</option>
              {leads.map((l) => <option key={l.id} value={l.id}>@{l.x_handle}{l.company ? ` (${l.company})` : ""}</option>)}
            </Select>
          </FormField>
          <FormField label="Deliverables">
            <textarea
              value={form.deliverables}
              onChange={(e) => setForm((f) => ({ ...f, deliverables: e.target.value }))}
              placeholder="e.g. 60-sec launch video + 15-sec teaser"
              className="flex min-h-[60px] w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </FormField>
          <Button onClick={handleSave} disabled={saving} className="w-full">
            {saving ? "Creating…" : "Create Project"}
          </Button>
        </div>
      </Sheet>
    </div>
  );
}
