import { createClient } from "@/lib/supabase/server";
import { Topbar } from "@/components/layout/topbar";
import { DashboardClient } from "./dashboard-client";
import { startOfMonth, endOfMonth, subDays, format } from "date-fns";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const now = new Date();
  const monthStart = format(startOfMonth(now), "yyyy-MM-dd");
  const monthEnd = format(endOfMonth(now), "yyyy-MM-dd");
  const thirtyDaysAgo = format(subDays(now, 30), "yyyy-MM-dd");
  const fourteenDaysAgo = format(subDays(now, 14), "yyyy-MM-dd");
  const today = format(now, "yyyy-MM-dd");
  const threeDaysOut = format(subDays(now, -3), "yyyy-MM-dd");
  const weekStart = format(subDays(now, now.getDay()), "yyyy-MM-dd");
  const weekEnd = format(subDays(now, now.getDay() - 6), "yyyy-MM-dd");

  const [
    { data: monthIncome },
    { count: activeLeads },
    { count: activeProjects },
    { data: savingsGoal },
    { data: recentIncome },
    { data: recentLeadsData },
    { data: followUps },
    { data: weekContent },
    { data: activeProjectsList },
    { data: checklistToday },
    { data: recentLeads },
  ] = await Promise.all([
    supabase.from("income").select("amount, date").eq("user_id", user.id).gte("date", monthStart).lte("date", monthEnd),
    supabase.from("leads").select("id", { count: "exact", head: true }).eq("user_id", user.id).not("status", "in", '("Closed Won","Closed Lost")'),
    supabase.from("projects").select("id", { count: "exact", head: true }).eq("user_id", user.id).not("status", "in", '("Completed","Cancelled")'),
    supabase.from("savings_goals").select("*").eq("user_id", user.id).eq("status", "Active").limit(1).maybeSingle(),
    supabase.from("income").select("amount, date").eq("user_id", user.id).gte("date", thirtyDaysAgo).order("date"),
    supabase.from("leads").select("date_found").eq("user_id", user.id).gte("date_found", fourteenDaysAgo).order("date_found"),
    supabase.from("leads").select("id, x_handle, company, follow_up_date, status").eq("user_id", user.id).lte("follow_up_date", threeDaysOut).not("status", "in", '("Closed Won","Closed Lost")').order("follow_up_date").limit(5),
    supabase.from("content_posts").select("id, platform, content_type, status, scheduled_date").eq("user_id", user.id).gte("scheduled_date", weekStart).lte("scheduled_date", weekEnd).order("scheduled_date"),
    supabase.from("projects").select("id, client_name, project_type, price, status, deadline").eq("user_id", user.id).not("status", "in", '("Completed","Cancelled")').order("deadline").limit(4),
    supabase.from("daily_checklist").select("*").eq("user_id", user.id).eq("date", today),
    supabase.from("leads").select("id, x_handle, company, status, estimated_value, date_found").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5),
  ]);

  const totalMonthRevenue = monthIncome?.reduce((s, r) => s + (r.amount ?? 0), 0) ?? 0;

  // Build daily revenue chart data (last 30 days)
  const revenueByDay: Record<string, number> = {};
  for (let i = 29; i >= 0; i--) {
    const d = format(subDays(now, i), "yyyy-MM-dd");
    revenueByDay[d] = 0;
  }
  recentIncome?.forEach((r) => {
    if (revenueByDay[r.date] !== undefined) revenueByDay[r.date] += r.amount;
  });
  const revenueChartData = Object.entries(revenueByDay).map(([date, amount]) => ({
    date: format(new Date(date + "T00:00:00"), "MMM d"),
    amount,
  }));

  // Build leads chart data (last 14 days)
  const leadsByDay: Record<string, number> = {};
  for (let i = 13; i >= 0; i--) {
    const d = format(subDays(now, i), "yyyy-MM-dd");
    leadsByDay[d] = 0;
  }
  recentLeadsData?.forEach((r) => {
    if (leadsByDay[r.date_found] !== undefined) leadsByDay[r.date_found]++;
  });
  const leadsChartData = Object.entries(leadsByDay).map(([date, count]) => ({
    date: format(new Date(date + "T00:00:00"), "MMM d"),
    count,
  }));

  return (
    <div className="flex flex-col h-full">
      <Topbar title="Dashboard" />
      <div className="flex-1 p-4 md:p-6 space-y-6 overflow-auto">
        <DashboardClient
          totalMonthRevenue={totalMonthRevenue}
          activeLeads={activeLeads ?? 0}
          activeProjects={activeProjects ?? 0}
          savingsGoal={savingsGoal}
          revenueChartData={revenueChartData}
          leadsChartData={leadsChartData}
          followUps={followUps ?? []}
          weekContent={weekContent ?? []}
          activeProjectsList={activeProjectsList ?? []}
          checklistToday={checklistToday ?? []}
          recentLeads={recentLeads ?? []}
          today={today}
        />
      </div>
    </div>
  );
}
