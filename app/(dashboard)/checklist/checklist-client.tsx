"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { DailyChecklist } from "@/types/database";
import { Zap, CheckCircle2, Circle, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChecklistClientProps {
  initialTasks: DailyChecklist[];
  weekChartData: { date: string; pct: number }[];
  streak: number;
  userId: string;
  today: string;
}

export function ChecklistClient({ initialTasks, weekChartData, streak, userId, today }: ChecklistClientProps) {
  const [tasks, setTasks] = useState<DailyChecklist[]>(initialTasks);

  const completedTasks = tasks.filter((t) => t.is_done).length;
  const totalPct = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const updateTask = async (task: DailyChecklist, newCount: number, newDone?: boolean) => {
    const supabase = createClient();
    const isDone = newDone !== undefined ? newDone : newCount >= task.target_count;
    await supabase.from("daily_checklist").update({
      completed_count: newCount,
      is_done: isDone,
      completed_at: isDone ? new Date().toISOString() : null,
    }).eq("id", task.id);
    setTasks((prev) =>
      prev.map((t) => t.id === task.id ? { ...t, completed_count: newCount, is_done: isDone } : t)
    );
    if (isDone && !task.is_done) toast.success(`✓ ${task.task_label} complete!`);
  };

  const circumference = 2 * Math.PI * 40;
  const strokeDash = circumference - (totalPct / 100) * circumference;

  return (
    <div className="flex-1 overflow-auto p-4 md:p-6 space-y-6">
      {/* Top section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Ring chart */}
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-6 gap-3">
            <div className="relative">
              <svg width="100" height="100" className="-rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#1e2433" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="40" fill="none" stroke="#6366f1" strokeWidth="8"
                  strokeDasharray={circumference} strokeDashoffset={strokeDash}
                  strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.5s ease" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-white">{totalPct}%</span>
              </div>
            </div>
            <p className="text-sm text-slate-400">{completedTasks} of {tasks.length} done</p>
          </CardContent>
        </Card>

        {/* Streak */}
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-6 gap-2">
            <div className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-amber-400" />
              <span className="text-4xl font-bold text-amber-400">{streak}</span>
            </div>
            <p className="text-sm text-slate-400">Day Streak</p>
            <p className="text-xs text-slate-600">Complete all tasks to keep it going</p>
          </CardContent>
        </Card>

        {/* Weekly chart */}
        <Card>
          <CardHeader><CardTitle>Last 7 Days</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={80}>
              <BarChart data={weekChartData}>
                <XAxis dataKey="date" tick={{ fill: "#64748b", fontSize: 10 }} tickLine={false} axisLine={false} />
                <YAxis hide domain={[0, 100]} />
                <Tooltip formatter={(v: any) => [`${v}%`, "Completion"]} contentStyle={{ background: "#1a1f2e", border: "1px solid #2d3748", borderRadius: "8px", fontSize: "12px" }} />
                <Bar dataKey="pct" radius={[4, 4, 0, 0]}>
                  {weekChartData.map((entry, i) => (
                    <Cell key={i} fill={entry.pct === 100 ? "#10b981" : entry.pct >= 60 ? "#6366f1" : "#374151"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Task list */}
      <Card>
        <CardHeader>
          <CardTitle>Today&apos;s Tasks — {today}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tasks.map((task) => {
              const pct = Math.min(100, (task.completed_count / task.target_count) * 100);
              return (
                <div key={task.id} className={cn("rounded-xl border p-4 transition-colors", task.is_done ? "border-emerald-500/30 bg-emerald-500/5" : "border-slate-700/40 bg-slate-800/20")}>
                  <div className="flex items-center gap-3 mb-3">
                    <button
                      onClick={() => updateTask(task, task.is_done ? 0 : task.target_count, !task.is_done)}
                      className="shrink-0"
                    >
                      {task.is_done
                        ? <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                        : <Circle className="h-5 w-5 text-slate-600" />
                      }
                    </button>
                    <div className="flex-1">
                      <p className={cn("text-sm font-medium", task.is_done ? "text-emerald-400" : "text-slate-200")}>{task.task_label}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => updateTask(task, Math.max(0, task.completed_count - 1))}
                        disabled={task.completed_count <= 0}
                        className="h-7 w-7 flex items-center justify-center rounded-lg border border-slate-700 hover:bg-slate-700 disabled:opacity-30 transition-colors"
                      >
                        <Minus className="h-3 w-3 text-slate-400" />
                      </button>
                      <span className="text-sm font-bold text-slate-200 min-w-[40px] text-center">
                        {task.completed_count}<span className="text-slate-500 font-normal">/{task.target_count}</span>
                      </span>
                      <button
                        onClick={() => updateTask(task, task.completed_count + 1)}
                        className="h-7 w-7 flex items-center justify-center rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors bg-indigo-600/20 border-indigo-600/30"
                      >
                        <Plus className="h-3 w-3 text-indigo-400" />
                      </button>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-700">
                    <div
                      className={cn("h-full rounded-full transition-all duration-500", task.is_done ? "bg-emerald-500" : "bg-indigo-500")}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
