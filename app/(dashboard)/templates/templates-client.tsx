"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet } from "@/components/ui/sheet";
import { FormField } from "@/components/ui/form-field";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { DMTemplate, DMTemplateType } from "@/types/database";
import { Plus, Copy, Star, Trash2, Edit2, MessageCircle } from "lucide-react";

const TYPES: DMTemplateType[] = ["Initial Outreach", "Mockup Offer", "Value-First", "Follow-Up", "Meeting Request"];
const TYPE_COLORS: Record<string, any> = {
  "Mockup Offer": "success", "Value-First": "indigo", "Initial Outreach": "blue",
  "Follow-Up": "amber", "Meeting Request": "violet",
};

const EMPTY_FORM = { name: "", template_type: "Initial Outreach" as DMTemplateType, content: "", use_case: "" };

interface TemplatesClientProps { initialTemplates: DMTemplate[]; userId: string; }

export function TemplatesClient({ initialTemplates, userId }: TemplatesClientProps) {
  const [templates, setTemplates] = useState<DMTemplate[]>(initialTemplates);
  const [filter, setFilter] = useState("All");
  const [showSheet, setShowSheet] = useState(false);
  const [editTemplate, setEditTemplate] = useState<DMTemplate | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const filtered = filter === "All" ? templates : templates.filter((t) => t.template_type === filter);

  const copyTemplate = async (template: DMTemplate) => {
    await navigator.clipboard.writeText(template.content);
    toast.success("Copied to clipboard!");
    const supabase = createClient();
    await supabase.from("dm_templates").update({ times_used: template.times_used + 1 }).eq("id", template.id);
    setTemplates((prev) => prev.map((t) => t.id === template.id ? { ...t, times_used: t.times_used + 1 } : t));
  };

  const toggleFav = async (template: DMTemplate) => {
    const supabase = createClient();
    await supabase.from("dm_templates").update({ is_favorite: !template.is_favorite }).eq("id", template.id);
    setTemplates((prev) => prev.map((t) => t.id === template.id ? { ...t, is_favorite: !t.is_favorite } : t));
  };

  const openEdit = (template: DMTemplate) => {
    setEditTemplate(template);
    setForm({ name: template.name, template_type: template.template_type, content: template.content, use_case: template.use_case ?? "" });
    setShowSheet(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.content) { toast.error("Name and content required"); return; }
    setSaving(true);
    const supabase = createClient();
    if (editTemplate) {
      const { data } = await supabase.from("dm_templates").update({ name: form.name, template_type: form.template_type, content: form.content, use_case: form.use_case || null }).eq("id", editTemplate.id).select().single();
      if (data) { setTemplates((p) => p.map((t) => t.id === data.id ? data : t)); toast.success("Template updated"); setShowSheet(false); }
    } else {
      const { data } = await supabase.from("dm_templates").insert({ user_id: userId, ...form, use_case: form.use_case || null }).select().single();
      if (data) { setTemplates((p) => [data, ...p]); toast.success("Template created"); setShowSheet(false); setForm(EMPTY_FORM); }
    }
    setSaving(false);
  };

  const deleteTemplate = async (id: string) => {
    const supabase = createClient();
    await supabase.from("dm_templates").delete().eq("id", id);
    setTemplates((p) => p.filter((t) => t.id !== id));
    setShowSheet(false);
    toast.success("Template deleted");
  };

  const highlightVars = (content: string) => {
    return content.replace(/\[([^\]]+)\]/g, '<mark class="bg-amber-500/20 text-amber-400 rounded px-0.5 not-italic">[$1]</mark>');
  };

  return (
    <div className="flex-1 overflow-auto p-4 md:p-6 space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 overflow-x-auto">
          {["All", ...TYPES].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={cn("shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors", filter === t ? "bg-indigo-600 text-white" : "border border-slate-700 text-slate-400 hover:border-slate-500")}
            >
              {t}
            </button>
          ))}
        </div>
        <Button size="sm" onClick={() => { setEditTemplate(null); setForm(EMPTY_FORM); setShowSheet(true); }} className="gap-1 shrink-0">
          <Plus className="h-3.5 w-3.5" /> New Template
        </Button>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 gap-3">
          <MessageCircle className="h-10 w-10 text-slate-700" />
          <p className="text-slate-500 text-sm">No templates yet</p>
          <Button size="sm" onClick={() => setShowSheet(true)}><Plus className="h-4 w-4 mr-1" />Create first template</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((template) => (
            <div key={template.id} className={cn("rounded-xl border bg-slate-800/30 p-4 flex flex-col gap-3 transition-colors", template.is_favorite ? "border-amber-500/40" : "border-slate-700/40 hover:border-slate-600")}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-200 truncate">{template.name}</p>
                  <Badge variant={TYPE_COLORS[template.template_type] ?? "gray"} className="mt-1">{template.template_type}</Badge>
                </div>
                <button onClick={() => toggleFav(template)} className="shrink-0 mt-0.5">
                  <Star className={cn("h-4 w-4 transition-colors", template.is_favorite ? "fill-amber-400 text-amber-400" : "text-slate-600 hover:text-amber-400")} />
                </button>
              </div>

              {template.use_case && (
                <p className="text-[11px] text-slate-500 italic">{template.use_case}</p>
              )}

              <div
                className="text-xs text-slate-400 bg-slate-900/50 rounded-lg p-3 max-h-[120px] overflow-y-auto leading-relaxed"
                dangerouslySetInnerHTML={{ __html: highlightVars(template.content) }}
              />

              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-600">{template.times_used} uses</span>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(template)} className="p-1.5 rounded hover:bg-slate-700 text-slate-500 hover:text-slate-300">
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => deleteTemplate(template.id)} className="p-1.5 rounded hover:bg-red-900/30 text-slate-500 hover:text-red-400">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                  <Button size="sm" onClick={() => copyTemplate(template)} className="h-7 text-xs gap-1 ml-1">
                    <Copy className="h-3 w-3" /> Copy
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sheet */}
      <Sheet open={showSheet} onClose={() => setShowSheet(false)} title={editTemplate ? "Edit Template" : "New DM Template"} width="w-[560px]">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Template Name" required>
              <Input placeholder="Mockup Offer" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            </FormField>
            <FormField label="Type">
              <Select value={form.template_type} onChange={(e) => setForm((f) => ({ ...f, template_type: e.target.value as DMTemplateType }))}>
                {TYPES.map((t) => <option key={t}>{t}</option>)}
              </Select>
            </FormField>
          </div>
          <FormField label="Use Case (optional)" hint="When to use this template">
            <Input placeholder="Best for warm leads where you've done a mockup" value={form.use_case} onChange={(e) => setForm((f) => ({ ...f, use_case: e.target.value }))} />
          </FormField>
          <FormField label="Template Content" required hint="Use [Name], [Product], [Specific Thing] as placeholders">
            <textarea
              value={form.content}
              onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              placeholder="Hey [Name], saw you just [specific thing]…"
              className="flex min-h-[180px] w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none font-mono"
            />
          </FormField>
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={saving} className="flex-1">{saving ? "Saving…" : editTemplate ? "Update" : "Create"}</Button>
            {editTemplate && <Button variant="destructive" onClick={() => deleteTemplate(editTemplate.id)}>Delete</Button>}
          </div>
        </div>
      </Sheet>
    </div>
  );
}
