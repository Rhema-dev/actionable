import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Topbar } from "@/components/layout/topbar";
import { ProjectDetailClient } from "./project-detail-client";

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!project) notFound();

  return (
    <div className="flex flex-col h-full">
      <Topbar title={project.client_name} />
      <ProjectDetailClient project={project} userId={user.id} />
    </div>
  );
}
