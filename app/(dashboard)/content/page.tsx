import { createClient } from "@/lib/supabase/server";
import { Topbar } from "@/components/layout/topbar";
import { ContentClient } from "./content-client";
import { format, startOfMonth, endOfMonth } from "date-fns";

export default async function ContentPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: posts } = await supabase
    .from("content_posts")
    .select("*")
    .eq("user_id", user.id)
    .order("scheduled_date", { ascending: true });

  return (
    <div className="flex flex-col h-full">
      <Topbar title="Content Calendar" />
      <ContentClient initialPosts={posts ?? []} userId={user.id} />
    </div>
  );
}
