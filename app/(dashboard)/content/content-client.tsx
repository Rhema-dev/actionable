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
import { cn } from "@/lib/utils";
import type { ContentPost, ContentPlatform, ContentType, ContentStatus } from "@/types/database";
import { Plus, Calendar, List, Edit2, Trash2, Target } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isToday } from "date-fns";

const PLATFORMS: ContentPlatform[] = ["X", "YouTube", "LinkedIn", "Instagram", "TikTok"];
const TYPES: ContentType[] = ["Showcase", "Value/Tips", "Behind-Scenes", "Poll", "Question", "Repurposed", "Short", "Long Video"];
const STATUSES: ContentStatus[] = ["Draft", "Scheduled", "Published", "Skipped"];

const PLATFORM_COLOR: Record<string, string> = {
  X: "bg-blue-500/20 text-blue-400",
  YouTube: "bg-red-500/20 text-red-400",
  LinkedIn: "bg-sky-700/20 text-sky-300",
  Instagram: "bg-pink-500/20 text-pink-400",
  TikTok: "bg-emerald-500/20 text-emerald-400",
};

const PLATFORM_META: Record<string, { positioning: string; cadence: string }> = {
  X: {
    positioning: "Creative generalist exploring the psychology of creativity, human behavior & productivity while building across motion design, cybersecurity, fullstack dev, game dev, and music.",
    cadence: "3–5 original posts/day + 15–30 replies · Monday: Psychology thread · Tuesday: Building in public · Wednesday: Value/framework · Thursday: Motion tip · Friday: Reflective · Weekend: Polls/questions",
  },
  YouTube: {
    positioning: "Deep tutorials for AE + Blender + DaVinci — focused on client acquisition and technical skill growth for motion designers and creative generalists.",
    cadence: "Tuesday: Long-form (28 videos scheduled Jun–Dec) · Friday: Shorts · Target: Consistent publishing + channel growth",
  },
  LinkedIn: {
    positioning: "Motion designer documenting the cybersecurity learning journey. Transferable skills from creative work → security. Non-traditional path storytelling.",
    cadence: "3–4 posts/week · Monday: Learning update · Wednesday: Carousel (transferable skills) · Friday: Reflection · Target: 3k–6k connections + inbound opportunities by Dec 2027",
  },
  Instagram: {
    positioning: "Motion designer (AE + Blender) exploring creativity, psychology, and process through visual storytelling. Visual portfolio identity.",
    cadence: "4–6 Reels/week + 3–4 feed posts + daily Stories · Phase 1 (Jun–Dec): Core AE + Blender identity · Target: 5k–12k followers by Dec 2027",
  },
  TikTok: {
    positioning: "Creative generalist showing the real process, psychology, and chaos of building across multiple skills. Most personality-driven platform.",
    cadence: "5–7 videos/week · Day X of Cybersecurity series + AE/Blender hacks + multi-skill life · Target: 10k–30k+ followers by Dec 2027",
  },
};

const STATUS_VARIANT: Record<string, any> = {
  Draft: "gray", Scheduled: "blue", Published: "success", Skipped: "danger",
};

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
  const [platformFilter, setPlatformFilter] = useState<"All" | ContentPlatform>("All");
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [showSheet, setShowSheet] = useState(false);
  const [editPost, setEditPost] = useState<ContentPost | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [showMetrics, setShowMetrics] = useState<string | null>(null);
  const [metrics, setMetrics] = useState({ likes: 0, replies: 0, reposts: 0, impressions: 0, views: 0 });

  const filteredPosts = useMemo(
    () => platformFilter === "All" ? posts : posts.filter((p) => p.platform === platformFilter),
    [posts, platformFilter]
  );

  const monthStart = startOfMonth(calendarDate);
  const monthEnd = endOfMonth(calendarDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startPad = getDay(monthStart);

  const postsByDay = useMemo(() => {
    const map: Record<string, ContentPost[]> = {};
    filteredPosts.forEach((p) => {
      if (p.scheduled_date) {
        if (!map[p.scheduled_date]) map[p.scheduled_date] = [];
        map[p.scheduled_date].push(p);
      }
    });
    return map;
  }, [filteredPosts]);

  const thisWeekCount = useMemo(() => {
    return posts.filter((p) => {
      const d = p.scheduled_date ? new Date(p.scheduled_date + "T00:00:00") : null;
      if (!d) return false;
      const now = new Date();
      const diff = (d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
      const inWeek = diff >= -now.getDay() && diff < 7 - now.getDay();
      return inWeek && (platformFilter === "All" || p.platform === platformFilter);
    }).length;
  }, [posts, platformFilter]);

  const openAdd = (date?: string) => {
    setEditPost(null);
    const defaultPlatform = platformFilter !== "All" ? platformFilter : "X";
    setForm({ ...EMPTY_FORM, scheduled_date: date ?? "", platform: defaultPlatform });
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

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Platform Filter Bar */}
      <div className="px-4 md:px-6 py-3 border-b border-slate-700/40 space-y-2">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
            <button
              onClick={() => setPlatformFilter("All")}
              className={cn("shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-colors",
                platformFilter === "All" ? "bg-indigo-600 text-white" : "border border-slate-700 text-slate-400 hover:border-slate-500"
              )}
            >
              All
            </button>
            {PLATFORMS.map((p) => (
              <button
                key={p}
                onClick={() => setPlatformFilter(p)}
                className={cn("shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-colors",
                  platformFilter === p
                    ? cn(PLATFORM_COLOR[p], "ring-1 ring-current/50")
                    : "border border-slate-700 text-slate-400 hover:border-slate-500"
                )}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-sm text-slate-500">
              <span className="font-medium text-indigo-400">{thisWeekCount}</span>
              {" "}this week{platformFilter !== "All" ? ` · ${platformFilter}` : ""}
            </span>
            <Button size="sm" onClick={() => openAdd()} className="gap-1">
              <Plus className="h-3.5 w-3.5" /> Schedule Post
            </Button>
          </div>
        </div>

        {/* Per-platform strategy context */}
        {platformFilter !== "All" && PLATFORM_META[platformFilter] && (
          <div className="flex items-start gap-2.5 rounded-lg bg-slate-800/40 border border-slate-700/30 px-3 py-2.5">
            <Target className="h-3.5 w-3.5 text-slate-500 mt-0.5 shrink-0" />
            <div className="min-w-0 space-y-0.5">
              <p className="text-xs text-slate-300 leading-relaxed">{PLATFORM_META[platformFilter].positioning}</p>
              <p className="text-[10px] text-slate-500">{PLATFORM_META[platformFilter].cadence}</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto p-4 md:p-6">
        <Tabs defaultValue="calendar">
          <TabsList className="mb-4">
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
                  <div key={`pad-${i}`} className="min-h-20 border-b border-r border-slate-700/20" />
                ))}
                {days.map((day) => {
                  const dateStr = format(day, "yyyy-MM-dd");
                  const dayPosts = postsByDay[dateStr] ?? [];
                  const today = isToday(day);
                  return (
                    <div
                      key={dateStr}
                      className={cn("min-h-20 border-b border-r border-slate-700/20 p-1.5 cursor-pointer hover:bg-slate-700/20", today && "bg-indigo-900/20")}
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
                            {platformFilter === "All" ? `${post.platform} · ` : ""}{post.content_type}
                          </div>
                        ))}
                        {dayPosts.length > 3 && <p className="text-[10px] text-slate-500">+{dayPosts.length - 3}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          {/* List View */}
          <TabsContent value="list">
            {filteredPosts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 gap-3">
                <Calendar className="h-10 w-10 text-slate-700" />
                <p className="text-slate-500 text-sm">No posts for {platformFilter === "All" ? "any platform" : platformFilter} yet</p>
                <Button size="sm" onClick={() => openAdd()}><Plus className="h-4 w-4 mr-1" />Add first post</Button>
              </div>
            ) : (
              <div className="rounded-xl border border-slate-700/60 overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-slate-800/60">
                    <tr className="border-b border-slate-700/40">
                      {["Date", "Platform", "Type", "Hook / Title", "Status", "Impressions", ""].map((h) => (
                        <th key={h} className="px-3 py-2.5 text-left font-medium text-slate-400">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[...filteredPosts]
                      .sort((a, b) => (a.scheduled_date ?? "").localeCompare(b.scheduled_date ?? ""))
                      .map((post) => (
                        <tr key={post.id} className="border-b border-slate-700/20 hover:bg-slate-800/30 group">
                          <td className="px-3 py-2.5 text-slate-400 whitespace-nowrap">
                            {post.scheduled_date ? format(new Date(post.scheduled_date + "T00:00:00"), "MMM d") : "—"}
                          </td>
                          <td className="px-3 py-2.5">
                            <span className={cn("px-1.5 py-0.5 rounded text-[10px] font-bold", PLATFORM_COLOR[post.platform])}>{post.platform}</span>
                          </td>
                          <td className="px-3 py-2.5 text-slate-400">{post.content_type}</td>
                          <td className="px-3 py-2.5 max-w-xs">
                            <p className="truncate text-slate-300">{post.hook ?? post.title ?? post.content ?? "—"}</p>
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
          <FormField label="Title">
            <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Post title or topic…" />
          </FormField>
          <FormField label="Hook / First Line">
            <textarea value={form.hook} onChange={(e) => setForm((f) => ({ ...f, hook: e.target.value }))} placeholder="Your scroll-stopping opener…" className="flex min-h-20 w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
          </FormField>
          <FormField label="Full Content">
            <textarea value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} placeholder="Full post copy…" className="flex min-h-28 w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
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
          <FormField label="Notes">
            <Input value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} placeholder="Series name, context, ideas…" />
          </FormField>
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={saving} className="flex-1">
              {saving ? "Saving…" : editPost ? "Update Post" : "Add Post"}
            </Button>
            {editPost && <Button variant="destructive" onClick={() => deletePost(editPost.id)}>Delete</Button>}
          </div>
        </div>
      </Sheet>
    </div>
  );
}
