import { createClient } from "@/lib/supabase/server";
import { Topbar } from "@/components/layout/topbar";
import { PCFundClient } from "./pc-fund-client";

export default async function PCFundPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const [{ data: goal }, { data: contributions }] = await Promise.all([
    supabase.from("savings_goals").select("*").eq("user_id", user.id).eq("status", "Active").limit(1).maybeSingle(),
    supabase.from("expenses").select("*").eq("user_id", user.id).eq("is_pc_fund_contribution", true).order("date", { ascending: false }),
  ]);

  return (
    <div className="flex flex-col h-full">
      <Topbar title="PC Fund Goal" />
      <PCFundClient goal={goal} contributions={contributions ?? []} userId={user.id} />
    </div>
  );
}
