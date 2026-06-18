import { createClient } from "@/lib/supabase/server";
import { Topbar } from "@/components/layout/topbar";
import { ProjectsClient } from "./projects-client";

export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const [{ data: projects }, { data: leads }] = await Promise.all([
    supabase.from("projects").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
    supabase.from("leads").select("id, x_handle, company").eq("user_id", user.id).in("status", ["Closed Won", "Engaged", "Proposal Sent", "Negotiating"]),
  ]);

  return (
    <div className="flex flex-col h-full">
      <Topbar title="Projects" />
      <ProjectsClient initialProjects={projects ?? []} leads={leads ?? []} userId={user.id} />
    </div>
  );
}
