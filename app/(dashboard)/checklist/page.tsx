import { createClient } from "@/lib/supabase/server";
import { Topbar } from "@/components/layout/topbar";
import { ChecklistClient } from "./checklist-client";
import { format, subDays } from "date-fns";

export default async function ChecklistPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const today = format(new Date(), "yyyy-MM-dd");
  const sevenDaysAgo = format(subDays(new Date(), 6), "yyyy-MM-dd");

  const DEFAULT_TASKS = [
    { task_key: "morning_replies", task_label: "Morning Replies", target_count: 20 },
    { task_key: "lead_search", task_label: "Lead Search", target_count: 15 },
    { task_key: "post_content", task_label: "Post Content", target_count: 2 },
    { task_key: "dms_sent", task_label: "DMs Sent", target_count: 12 },
    { task_key: "update_tracker", task_label: "Update Tracker", target_count: 1 },
    { task_key: "evening_engagement", task_label: "Evening Engagement", target_count: 10 },
  ];

  // Auto-generate today's tasks if missing
  const { data: existing } = await supabase.from("daily_checklist").select("task_key").eq("user_id", user.id).eq("date", today);
  const existingKeys = new Set(existing?.map((e) => e.task_key) ?? []);
  const toInsert = DEFAULT_TASKS.filter((t) => !existingKeys.has(t.task_key)).map((t) => ({ ...t, user_id: user.id, date: today }));
  if (toInsert.length > 0) await supabase.from("daily_checklist").insert(toInsert);

  const { data: todayTasks } = await supabase.from("daily_checklist").select("*").eq("user_id", user.id).eq("date", today).order("created_at");
  const { data: weekData } = await supabase.from("daily_checklist").select("date, is_done, target_count, completed_count").eq("user_id", user.id).gte("date", sevenDaysAgo).lte("date", today);

  // Calculate streak
  let streak = 0;
  for (let i = 0; i < 30; i++) {
    const dateStr = format(subDays(new Date(), i), "yyyy-MM-dd");
    const dayTasks = weekData?.filter((t) => t.date === dateStr) ?? [];
    if (dayTasks.length === 0) break;
    const allDone = dayTasks.every((t) => t.is_done);
    if (!allDone) break;
    streak++;
  }

  // Weekly chart data
  const weekChartData = Array.from({ length: 7 }, (_, i) => {
    const dateStr = format(subDays(new Date(), 6 - i), "yyyy-MM-dd");
    const dayTasks = weekData?.filter((t) => t.date === dateStr) ?? [];
    const total = dayTasks.length;
    const done = dayTasks.filter((t) => t.is_done).length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    return { date: format(subDays(new Date(), 6 - i), "EEE"), pct };
  });

  return (
    <div className="flex flex-col h-full">
      <Topbar title="Daily Checklist" />
      <ChecklistClient initialTasks={todayTasks ?? []} weekChartData={weekChartData} streak={streak} userId={user.id} today={today} />
    </div>
  );
}
