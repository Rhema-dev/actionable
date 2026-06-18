"use client";
import { useState, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { Sheet } from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FormField } from "@/components/ui/form-field";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ContentPost, ContentPlatform, ContentType, ContentStatus } from "@/types/database";
import { Plus, Calendar, List, Copy, Edit2, Trash2 } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameMonth, isToday } from "date-fns";

const PLATFORMS: ContentPlatform[] = ["X", "YouTube", "LinkedIn"];
const TYPES: ContentType[] = ["Showcase", "Value/Tips", "Behind-Scenes", "Poll", "Question", "Repurposed", "Short", "Long Video"];
const STATUSES: ContentStatus[] = ["Draft", "Scheduled", "Published", "Skipped"];

const PLATFORM_COLOR: Record<string, string> = {
  X: "bg-blue-500/20 text-blue-400",
  YouTube: "bg-red-500/20 text-red-400",
  LinkedIn: "bg-blue-700/20 text-blue-300",
};

const STATUS_VARIANT: Record<string, any> = {
  Draft: "gray", Scheduled: "blue", Published: "success", Skipped: "danger",
};

const CONTENT_IDEAS = [
  { type: "Showcase", hook: "Before: confusing product. After: 45-sec motion explainer that hooks people.\n\nThis style is working for SaaS founders right now.\n\nDM me if you want one for your product." },
  { type: "Value/Tips", hook: "3 motion principles that make SaaS explainers convert better:\n\n1. Hook in first 3 seconds with the exact pain\n2. Show UI with satisfying, minimal animation\n3. End with crystal-clear CTA\n\nFounders using these see better X engagement." },
  { type: "Behind-Scenes", hook: "How I approach a SaaS onboarding video:\n\n1. Understand the user's first 'aha' moment\n2. Break into 4–6 simple animated steps\n3. Add micro-interactions that feel premium\n\nWant me to walk through one for your tool?" },
  { type: "Poll", hook: "SaaS founders — what's the biggest challenge getting new users to understand your product?\n\n🔵 Video content\n🟢 Docs/onboarding\n🟡 Support tickets\n⚪ Something else" },
  { type: "Value/Tips", hook: "Pro tip for SaaS founders:\n\nYour launch video doesn't need to be 3 minutes.\n\n45–75 seconds with strong motion + clear storytelling usually performs best." },
];

const EMPTY_FORM = {
  platform: "X" as ContentPlatform, content_type: "Value/Tips" as ContentType,
  title: "", hook: "", content: "", call_to_action: "", scheduled_date: "", scheduled_time: "", notes: "",
};

interface ContentClientProps {
  initialPosts: ContentPost[];
  userId: string;
}

export function ContentClient({ initialPosts, userId }: ContentClientProps) {
  const [posts, setPosts] = useState<ContentPost[]>(initialPosts);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [showSheet, setShowSheet] = useState(false);
  const [editPost, setEditPost] = useState<ContentPost | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [showMetrics, setShowMetrics] = useState<string | null>(null);
  const [metrics, setMetrics] = useState({ likes: 0, replies: 0, reposts: 0, impressions: 0, views: 0 });

  const monthStart = startOfMonth(calendarDate);
  const monthEnd = endOfMonth(calendarDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startPad = getDay(monthStart);

  const postsByDay = useMemo(() => {
    const map: Record<string, ContentPost[]> = {};
    posts.forEach((p) => {
      if (p.scheduled_date) {
        if (!map[p.scheduled_date]) map[p.scheduled_date] = [];
        map[p.scheduled_date].push(p);
      }
    });
    return map;
  }, [posts]);

  const thisWeekX = posts.filter((p) => {
    const d = p.scheduled_date ? new Date(p.scheduled_date + "T00:00:00") : null;
    if (!d) return false;
    const now = new Date();
    const diff = (d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return diff >= -now.getDay() && diff < 7 - now.getDay() && p.platform === "X";
  }).length;

  const openAdd = (date?: string) => {
    setEditPost(null);
    setForm({ ...EMPTY_FORM, scheduled_date: date ?? "" });
    setShowSheet(true);
  };

  const openEdit = (post: ContentPost) => {
    setEditPost(post);
    setForm({
      platform: post.platform, content_type: post.content_type,
      title: post.title ?? "", hook: post.hook ?? "",
      content: post.content ?? "", call_to_action: post.call_to_action ?? "",
      scheduled_date: post.scheduled_date ?? "", scheduled_time: post.scheduled_time ?? "",
      notes: post.notes ?? "",
    });
    setShowSheet(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const supabase = createClient();
    const payload = {
      user_id: userId,
      platform: form.platform, content_type: form.content_type,
      title: form.title || null, hook: form.hook || null,
      content: form.content || null, call_to_action: form.call_to_action || null,
      scheduled_date: form.scheduled_date || null, scheduled_time: form.scheduled_time || null,
      notes: form.notes || null,
    };
    if (editPost) {
      const { data, error } = await supabase.from("content_posts").update(payload).eq("id", editPost.id).select().single();
      if (error) { toast.error(error.message); } else {
        setPosts((p) => p.map((x) => x.id === editPost.id ? data : x));
        toast.success("Post updated"); setShowSheet(false);
      }
    } else {
      const { data, error } = await supabase.from("content_posts").insert({ ...payload, status: "Draft" }).select().single();
      if (error) { toast.error(error.message); } else {
        setPosts((p) => [...p, data]); toast.success("Post added"); setShowSheet(false);
      }
    }
    setSaving(false);
  };

  const cycleStatus = async (post: ContentPost) => {
    const order: ContentStatus[] = ["Draft", "Scheduled", "Published", "Skipped"];
    const next = order[(order.indexOf(post.status) + 1) % order.length];
    const supabase = createClient();
    await supabase.from("content_posts").update({ status: next, published_at: next === "Published" ? new Date().toISOString() : null }).eq("id", post.id);
    setPosts((p) => p.map((x) => x.id === post.id ? { ...x, status: next } : x));
    if (next === "Published") setShowMetrics(post.id);
  };

  const saveMetrics = async (postId: string) => {
    const supabase = createClient();
    await supabase.from("content_posts").update(metrics).eq("id", postId);
    setPosts((p) => p.map((x) => x.id === postId ? { ...x, ...metrics } : x));
    setShowMetrics(null);
    toast.success("Metrics saved");
  };

  const deletePost = async (id: string) => {
    const supabase = createClient();
    await supabase.from("content_posts").delete().eq("id", id);
    setPosts((p) => p.filter((x) => x.id !== id));
    setShowSheet(false);
    toast.success("Post deleted");
  };

  const useIdea = (idea: typeof CONTENT_IDEAS[0]) => {
    setForm((f) => ({ ...f, content_type: idea.type as ContentType, hook: idea.hook }));
    setShowSheet(true);
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-slate-700/40">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <span className="font-medium text-indigo-400">{thisWeekX}</span>/3–5 X posts this week
        </div>
        <Button size="sm" onClick={() => openAdd()} className="gap-1">
          <Plus className="h-3.5 w-3.5" /> Schedule Post
        </Button>
      </div>

      <div className="flex-1 overflow-auto p-4 md:p-6 space-y-6">
        <Tabs defaultValue="calendar">
          <TabsList>
            <TabsTrigger value="calendar"><Calendar className="h-3.5 w-3.5 mr-1.5" />Calendar</TabsTrigger>
            <TabsTrigger value="list"><List className="h-3.5 w-3.5 mr-1.5" />List</TabsTrigger>
          </TabsList>

          {/* Calendar View */}
          <TabsContent value="calendar">
            <div className="rounded-xl border border-slate-700/60 bg-slate-800/20 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/40">
                <button onClick={() => setCalendarDate((d) => new Date(d.getFullYear(), d.getMonth() - 1))} className="p-1 rounded hover:bg-slate-700 text-slate-400">‹</button>
                <h3 className="font-semibold text-slate-200">{format(calendarDate, "MMMM yyyy")}</h3>
                <button onClick={() => setCalendarDate((d) => new Date(d.getFullYear(), d.getMonth() + 1))} className="p-1 rounded hover:bg-slate-700 text-slate-400">›</button>
              </div>
              <div className="grid grid-cols-7 border-b border-slate-700/40">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div key={d} className="py-2 text-center text-xs font-medium text-slate-500">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7">
                {Array.from({ length: startPad }).map((_, i) => (
                  <div key={`pad-${i}`} className="min-h-[80px] border-b border-r border-slate-700/20" />
                ))}
                {days.map((day) => {
                  const dateStr = format(day, "yyyy-MM-dd");
                  const dayPosts = postsByDay[dateStr] ?? [];
                  const today = isToday(day);
                  return (
                    <div
                      key={dateStr}
                      className={cn("min-h-[80px] border-b border-r border-slate-700/20 p-1.5 cursor-pointer hover:bg-slate-700/20", today && "bg-indigo-900/20")}
                      onClick={() => { setSelectedDay(selectedDay === dateStr ? null : dateStr); openAdd(dateStr); }}
                    >
                      <span className={cn("text-xs font-medium", today ? "text-indigo-400" : "text-slate-400")}>{format(day, "d")}</span>
                      <div className="mt-1 space-y-0.5">
                        {dayPosts.slice(0, 3).map((post) => (
                          <div
                            key={post.id}
                            onClick={(e) => { e.stopPropagation(); openEdit(post); }}
                            className={cn("text-[10px] rounded px-1 py-0.5 truncate cursor-pointer", PLATFORM_COLOR[post.platform])}
                          >
                            {post.platform} · {post.content_type}
                          </div>
                        ))}
                        {dayPosts.length > 3 && <p className="text-[10px] text-slate-500">+{dayPosts.length - 3} more</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          {/* List View */}
          <TabsContent value="list">
            {posts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 gap-3">
                <Calendar className="h-10 w-10 text-slate-700" />
                <p className="text-slate-500 text-sm">No posts scheduled yet</p>
                <Button size="sm" onClick={() => openAdd()}><Plus className="h-4 w-4 mr-1" />Schedule first post</Button>
              </div>
            ) : (
              <div className="rounded-xl border border-slate-700/60 overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-slate-800/60">
                    <tr className="border-b border-slate-700/40">
                      {["Date", "Time", "Platform", "Type", "Hook", "Status", "Impressions", "Actions"].map((h) => (
                        <th key={h} className="px-3 py-2.5 text-left font-medium text-slate-400">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[...posts].sort((a, b) => (a.scheduled_date ?? "").localeCompare(b.scheduled_date ?? "")).map((post) => (
                      <tr key={post.id} className="border-b border-slate-700/20 hover:bg-slate-800/30 group">
                        <td className="px-3 py-2.5 text-slate-400">{post.scheduled_date ? format(new Date(post.scheduled_date + "T00:00:00"), "MMM d") : "—"}</td>
                        <td className="px-3 py-2.5 text-slate-500">{post.scheduled_time ?? "—"}</td>
                        <td className="px-3 py-2.5">
                          <span className={cn("px-1.5 py-0.5 rounded text-[10px] font-bold", PLATFORM_COLOR[post.platform])}>{post.platform}</span>
                        </td>
                        <td className="px-3 py-2.5 text-slate-400">{post.content_type}</td>
                        <td className="px-3 py-2.5 max-w-[200px]">
                          <p className="truncate text-slate-300">{post.hook ?? post.content ?? "—"}</p>
                        </td>
                        <td className="px-3 py-2.5">
                          <button onClick={() => cycleStatus(post)}>
                            <Badge variant={STATUS_VARIANT[post.status]} className="cursor-pointer">{post.status}</Badge>
                          </button>
                          {showMetrics === post.id && (
                            <div className="mt-2 flex gap-1 flex-wrap">
                              {(["impressions", "likes", "replies", "reposts"] as const).map((k) => (
                                <input key={k} type="number" placeholder={k} className="w-20 h-6 rounded bg-slate-700 border-none px-1.5 text-[10px] text-slate-200" onChange={(e) => setMetrics((m) => ({ ...m, [k]: parseInt(e.target.value) || 0 }))} />
                              ))}
                              <Button size="sm" className="h-6 text-[10px]" onClick={() => saveMetrics(post.id)}>Save</Button>
                            </div>
                          )}
                        </td>
                        <td className="px-3 py-2.5 text-slate-500">{post.impressions > 0 ? post.impressions.toLocaleString() : "—"}</td>
                        <td className="px-3 py-2.5">
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                            <button onClick={() => openEdit(post)} className="p-1 rounded hover:bg-slate-700 text-slate-400"><Edit2 className="h-3 w-3" /></button>
                            <button onClick={() => deletePost(post.id)} className="p-1 rounded hover:bg-red-900/30 text-slate-400 hover:text-red-400"><Trash2 className="h-3 w-3" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Content Ideas Library */}
        <div>
          <h3 className="text-sm font-semibold text-slate-300 mb-3">Content Ideas Library</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CONTENT_IDEAS.map((idea, i) => (
              <div key={i} className="rounded-xl border border-slate-700/40 bg-slate-800/20 p-4 space-y-3">
                <Badge variant="indigo">{idea.type}</Badge>
                <p className="text-xs text-slate-400 whitespace-pre-line line-clamp-4">{idea.hook}</p>
                <button
                  onClick={() => { navigator.clipboard.writeText(idea.hook); toast.success("Copied to clipboard"); }}
                  className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300"
                >
                  <Copy className="h-3 w-3" /> Copy · Use as template
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add/Edit Sheet */}
      <Sheet open={showSheet} onClose={() => setShowSheet(false)} title={editPost ? "Edit Post" : "Schedule Post"} width="w-[520px]">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Platform">
              <Select value={form.platform} onChange={(e) => setForm((f) => ({ ...f, platform: e.target.value as ContentPlatform }))}>
                {PLATFORMS.map((p) => <option key={p}>{p}</option>)}
              </Select>
            </FormField>
            <FormField label="Content Type">
              <Select value={form.content_type} onChange={(e) => setForm((f) => ({ ...f, content_type: e.target.value as ContentType }))}>
                {TYPES.map((t) => <option key={t}>{t}</option>)}
              </Select>
            </FormField>
          </div>
          <FormField label="Hook / First Line">
            <textarea value={form.hook} onChange={(e) => setForm((f) => ({ ...f, hook: e.target.value }))} placeholder="Your scroll-stopping opener…" className="flex min-h-[80px] w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
          </FormField>
          <FormField label="Full Content">
            <textarea value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} placeholder="Full post copy…" className="flex min-h-[120px] w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
          </FormField>
          <FormField label="Call to Action">
            <Input value={form.call_to_action} onChange={(e) => setForm((f) => ({ ...f, call_to_action: e.target.value }))} placeholder="DM me for a free concept" />
          </FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Scheduled Date">
              <Input type="date" value={form.scheduled_date} onChange={(e) => setForm((f) => ({ ...f, scheduled_date: e.target.value }))} />
            </FormField>
            <FormField label="Scheduled Time">
              <Input type="time" value={form.scheduled_time} onChange={(e) => setForm((f) => ({ ...f, scheduled_time: e.target.value }))} />
            </FormField>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={saving} className="flex-1">
              {saving ? "Saving…" : editPost ? "Update Post" : "Add Post"}
            </Button>
            {editPost && (
              <Button variant="destructive" onClick={() => deletePost(editPost.id)}>Delete</Button>
            )}
          </div>
        </div>
      </Sheet>
    </div>
  );
}
