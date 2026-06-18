import { createClient } from "@/lib/supabase/server";
import { Topbar } from "@/components/layout/topbar";
import { LeadsClient } from "./leads-client";

export default async function LeadsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col h-full">
      <Topbar title="Leads" />
      <LeadsClient initialLeads={leads ?? []} userId={user.id} />
    </div>
  );
}
