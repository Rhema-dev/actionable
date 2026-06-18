import { createClient } from "@/lib/supabase/server";
import { Topbar } from "@/components/layout/topbar";
import { SettingsClient } from "./settings-client";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();

  return (
    <div className="flex flex-col h-full">
      <Topbar title="Settings" />
      <SettingsClient profile={profile} userId={user.id} userEmail={user.email ?? ""} />
    </div>
  );
}
