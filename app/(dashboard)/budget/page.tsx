import { createClient } from "@/lib/supabase/server";
import { Topbar } from "@/components/layout/topbar";
import { BudgetClient } from "./budget-client";
import { format, startOfMonth, endOfMonth, subMonths } from "date-fns";

export default async function BudgetPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const now = new Date();
  const monthStart = format(startOfMonth(now), "yyyy-MM-dd");
  const monthEnd = format(endOfMonth(now), "yyyy-MM-dd");

  const [{ data: income }, { data: expenses }, { data: projects }, { data: profile }] = await Promise.all([
    supabase.from("income").select("*, projects(client_name)").eq("user_id", user.id).order("date", { ascending: false }),
    supabase.from("expenses").select("*").eq("user_id", user.id).order("date", { ascending: false }),
    supabase.from("projects").select("id, client_name").eq("user_id", user.id),
    supabase.from("profiles").select("monthly_revenue_goal").eq("id", user.id).single(),
  ]);

  return (
    <div className="flex flex-col h-full">
      <Topbar title="Income & Budget" />
      <BudgetClient
        initialIncome={income ?? []}
        initialExpenses={expenses ?? []}
        projects={projects ?? []}
        userId={user.id}
        monthlyGoal={profile?.monthly_revenue_goal ?? 3000}
      />
    </div>
  );
}
