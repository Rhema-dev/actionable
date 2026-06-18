"use client";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate, getDaysUntil, cn } from "@/lib/utils";
import { DollarSign, Users, Briefcase, Monitor, ExternalLink, CheckCircle2, Circle, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useState } from "react";
import type { SavingsGoal, DailyChecklist } from "@/types/database";

const leadStatusColor: Record<string, string> = {
  "New": "gray", "Contacted": "blue", "Engaged": "indigo",
  "Proposal Sent": "violet", "Negotiating": "amber",
  "Closed Won": "success", "Closed Lost": "danger",
};

interface Props {
  totalMonthRevenue: number;
  activeLeads: number;
  activeProjects: number;
  savingsGoal: SavingsGoal | null;
  revenueChartData: { date: string; amount: number }[];
  leadsChartData: { date: string; count: number }[];
  followUps: any[];
  weekContent: any[];
  activeProjectsList: any[];
  checklistToday: DailyChecklist[];
  recentLeads: any[];
  today: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs shadow-xl">
      <p className="text-slate-400 mb-1">{label}</p>
      <p className="font-semibold text-slate-200">
        {payload[0].name === "amount" ? formatCurrency(payload[0].value) : `${payload[0].value} leads`}
      </p>
    </div>
  );
};

export function DashboardClient({
  totalMonthRevenue, activeLeads, activeProjects, savingsGoal,
  revenueChartData, leadsChartData, followUps, weekContent,
  activeProjectsList, checklistToday: initialChecklist, recentLeads, today,
}: Props) {
  const [checklist, setChecklist] = useState(initialChecklist);

  const pcPct = savingsGoal
    ? Math.round((savingsGoal.current_amount / savingsGoal.target_amount) * 100)
    : 0;

  const toggleTask = async (task: DailyChecklist) => {
    const supabase = createClient();
    const newDone = !task.is_done;
    const newCount = newDone ? task.target_count : 0;
    await supabase
      .from("daily_checklist")
      .update({ is_done: newDone, completed_count: newCount })
      .eq("id", task.id);
    setChecklist((prev) =>
      prev.map((t) => t.id === task.id ? { ...t, is_done: newDone, completed_count: newCount } : t)
    );
  };

  const projectStatusStep: Record<string, number> = {
    "Scoping": 1, "In Progress": 2, "Client Review": 3, "Revisions": 4, "Completed": 5,
  };

  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Revenue This Month</p>
                <p className="text-2xl font-bold text-emerald-400 mt-1">{formatCurrency(totalMonthRevenue)}</p>
              </div>
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <DollarSign className="h-5 w-5 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Active Leads</p>
                <p className="text-2xl font-bold text-indigo-400 mt-1">{activeLeads}</p>
              </div>
              <div className="p-2 rounded-lg bg-indigo-500/10">
                <Users className="h-5 w-5 text-indigo-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Active Projects</p>
                <p className="text-2xl font-bold text-violet-400 mt-1">{activeProjects}</p>
              </div>
              <div className="p-2 rounded-lg bg-violet-500/10">
                <Briefcase className="h-5 w-5 text-violet-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs text-slate-500 font-medium">PC Fund</p>
                <p className="text-2xl font-bold text-amber-400 mt-1">{pcPct}%</p>
              </div>
              <div className="p-2 rounded-lg bg-amber-500/10">
                <Monitor className="h-5 w-5 text-amber-400" />
              </div>
            </div>
            {savingsGoal && (
              <Progress value={savingsGoal.current_amount} max={savingsGoal.target_amount} barClassName="bg-amber-500" />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Revenue — Last 30 Days</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={revenueChartData}>
                <XAxis dataKey="date" tick={{ fill: "#64748b", fontSize: 10 }} tickLine={false} axisLine={false} interval={6} />
                <YAxis tick={{ fill: "#64748b", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Leads Added — Last 14 Days</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={leadsChartData}>
                <XAxis dataKey="date" tick={{ fill: "#64748b", fontSize: 10 }} tickLine={false} axisLine={false} interval={3} />
                <YAxis tick={{ fill: "#64748b", fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Widgets Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Checklist */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Today&apos;s Checklist</CardTitle>
              <Link href="/checklist" className="text-xs text-indigo-400 hover:text-indigo-300">View all</Link>
            </div>
          </CardHeader>
          <CardContent>
            {checklist.length === 0 ? (
              <Link href="/checklist" className="block text-center py-4">
                <p className="text-sm text-slate-500">No tasks yet</p>
                <p className="text-xs text-indigo-400 mt-1">Open checklist to start</p>
              </Link>
            ) : (
              <div className="space-y-2">
                {checklist.slice(0, 5).map((task) => (
                  <div key={task.id} className="flex items-center gap-3">
                    <button onClick={() => toggleTask(task)} className="shrink-0">
                      {task.is_done
                        ? <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        : <Circle className="h-4 w-4 text-slate-600" />
                      }
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className={cn("text-xs truncate", task.is_done ? "line-through text-slate-500" : "text-slate-300")}>{task.task_label}</p>
                      <div className="mt-0.5 h-1 bg-slate-700 rounded-full">
                        <div className="h-full rounded-full bg-indigo-500 transition-all" style={{ width: `${Math.min(100, (task.completed_count / task.target_count) * 100)}%` }} />
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 shrink-0">{task.completed_count}/{task.target_count}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Follow-ups */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Follow-ups Due</CardTitle>
              <Link href="/leads" className="text-xs text-indigo-400 hover:text-indigo-300">View all</Link>
            </div>
          </CardHeader>
          <CardContent>
            {followUps.length === 0 ? (
              <p className="text-sm text-slate-500 py-4 text-center">No follow-ups due</p>
            ) : (
              <div className="space-y-2.5">
                {followUps.map((lead) => {
                  const days = getDaysUntil(lead.follow_up_date);
                  return (
                    <div key={lead.id} className="flex items-center gap-2">
                      <div className={cn("h-1.5 w-1.5 rounded-full shrink-0", days < 0 ? "bg-red-400" : days === 0 ? "bg-amber-400" : "bg-blue-400")} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-300 truncate">@{lead.x_handle}</p>
                        {lead.company && <p className="text-[10px] text-slate-500 truncate">{lead.company}</p>}
                      </div>
                      <span className={cn("text-[10px] shrink-0", days < 0 ? "text-red-400" : days === 0 ? "text-amber-400" : "text-slate-500")}>
                        {days < 0 ? `${Math.abs(days)}d overdue` : days === 0 ? "Today" : `${days}d`}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* This Week's Content */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>This Week&apos;s Content</CardTitle>
              <Link href="/content" className="text-xs text-indigo-400 hover:text-indigo-300">View all</Link>
            </div>
          </CardHeader>
          <CardContent>
            {weekContent.length === 0 ? (
              <Link href="/content" className="block text-center py-4">
                <p className="text-sm text-slate-500">Nothing scheduled</p>
                <p className="text-xs text-indigo-400 mt-1">Add content →</p>
              </Link>
            ) : (
              <div className="space-y-2.5">
                {weekContent.slice(0, 5).map((post) => (
                  <div key={post.id} className="flex items-center gap-2">
                    <span className={cn("text-[10px] font-bold shrink-0 px-1.5 py-0.5 rounded", post.platform === "X" ? "bg-blue-500/20 text-blue-400" : post.platform === "YouTube" ? "bg-red-500/20 text-red-400" : "bg-slate-700 text-slate-400")}>
                      {post.platform}
                    </span>
                    <p className="flex-1 text-xs text-slate-300 truncate">{post.content_type}</p>
                    <Badge variant={post.status === "Published" ? "success" : post.status === "Scheduled" ? "info" : "gray"} className="text-[10px]">
                      {post.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Leads */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Leads</CardTitle>
              <Link href="/leads">
                <Button variant="ghost" size="sm">View all</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {recentLeads.length === 0 ? (
              <div className="px-5 pb-5 text-center">
                <p className="text-sm text-slate-500 py-4">No leads yet</p>
                <Link href="/leads"><Button size="sm">Add first lead</Button></Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-700/40">
                {recentLeads.map((lead) => (
                  <div key={lead.id} className="flex items-center gap-3 px-5 py-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-200 truncate">@{lead.x_handle}</p>
                      <p className="text-xs text-slate-500 truncate">{lead.company || formatDate(lead.date_found)}</p>
                    </div>
                    <Badge variant={leadStatusColor[lead.status] as any}>{lead.status}</Badge>
                    {lead.estimated_value && (
                      <span className="text-xs text-emerald-400 font-medium shrink-0">{formatCurrency(lead.estimated_value)}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Active Projects */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Active Projects</CardTitle>
              <Link href="/projects">
                <Button variant="ghost" size="sm">View all</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {activeProjectsList.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-sm text-slate-500">No active projects</p>
                <Link href="/projects" className="text-xs text-indigo-400 mt-1 block">Start a project →</Link>
              </div>
            ) : (
              <div className="space-y-3">
                {activeProjectsList.map((project) => {
                  const days = project.deadline ? getDaysUntil(project.deadline) : null;
                  const step = projectStatusStep[project.status] ?? 1;
                  return (
                    <Link key={project.id} href={`/projects/${project.id}`} className="block">
                      <div className="rounded-lg border border-slate-700/40 bg-slate-800/30 p-3 hover:border-slate-600 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium text-slate-200 truncate">{project.client_name}</p>
                          <span className="text-sm font-bold text-emerald-400 shrink-0">{formatCurrency(project.price)}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="indigo" className="text-[10px]">{project.project_type}</Badge>
                          {days !== null && (
                            <span className={cn("text-[10px]", days < 0 ? "text-red-400" : days <= 3 ? "text-amber-400" : "text-slate-500")}>
                              {days < 0 ? `${Math.abs(days)}d overdue` : days === 0 ? "Due today" : `${days}d left`}
                            </span>
                          )}
                        </div>
                        <Progress value={step} max={5} barClassName="bg-violet-500" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
