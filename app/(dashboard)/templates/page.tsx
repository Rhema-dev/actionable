import { createClient } from "@/lib/supabase/server";
import { Topbar } from "@/components/layout/topbar";
import { TemplatesClient } from "./templates-client";

export default async function TemplatesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: templates } = await supabase
    .from("dm_templates")
    .select("*")
    .eq("user_id", user.id)
    .order("is_favorite", { ascending: false });

  return (
    <div className="flex flex-col h-full">
      <Topbar title="DM Templates" />
      <TemplatesClient initialTemplates={templates ?? []} userId={user.id} />
    </div>
  );
}
