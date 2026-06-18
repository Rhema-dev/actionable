"use client";
import { useState, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Sheet } from "@/components/ui/sheet";
import { FormField } from "@/components/ui/form-field";
import { formatCurrency, formatDate, getDaysUntil, cn } from "@/lib/utils";
import type { Lead, LeadStatus, LeadResponse } from "@/types/database";
import {
  Plus, Search, Download, ExternalLink, ChevronUp, ChevronDown,
  Users, TrendingUp, DollarSign, Calendar, AlertTriangle,
} from "lucide-react";
import { useRouter } from "next/navigation";

const STATUS_COLORS: Record<string, any> = {
  "New": "gray", "Contacted": "blue", "Engaged": "indigo",
  "Proposal Sent": "violet", "Negotiating": "amber",
  "Closed Won": "success", "Closed Lost": "danger",
};

const STATUSES: LeadStatus[] = ["New", "Contacted", "Engaged", "Proposal Sent", "Negotiating", "Closed Won", "Closed Lost"];
const RESPONSES: LeadResponse[] = ["No Reply", "Interested", "Not Interested", "Meeting Booked", "Converted"];
const SOURCES = ["X Search", "Reply", "Referral", "Direct DM", "Content", "Other"];

const EMPTY_FORM = {
  x_handle: "", company: "", follower_count: "", source: "X Search",
  estimated_value: "", notes: "", follow_up_date: "",
};

interface LeadsClientProps {
  initialLeads: Lead[];
  userId: string;
}

export function LeadsClient({ initialLeads, userId }: LeadsClientProps) {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showSheet, setShowSheet] = useState(false);
  const [editLead, setEditLead] = useState<Lead | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [sortKey, setSortKey] = useState<keyof Lead>("created_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = useMemo(() => {
    let arr = [...leads];
    if (search) {
      const q = search.toLowerCase();
      arr = arr.filter((l) => l.x_handle.toLowerCase().includes(q) || l.company?.toLowerCase().includes(q));
    }
    if (statusFilter !== "All") arr = arr.filter((l) => l.status === statusFilter);
    arr.sort((a, b) => {
      const av = a[sortKey] ?? "";
      const bv = b[sortKey] ?? "";
      const cmp = String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [leads, search, statusFilter, sortKey, sortDir]);

  const stats = useMemo(() => {
    const total = leads.length;
    const thisWeek = leads.filter((l) => {
      const d = new Date(l.date_found);
      const now = new Date();
      const diff = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
      return diff <= 7;
    }).length;
    const closedWon = leads.filter((l) => l.status === "Closed Won").length;
    const rate = total > 0 ? Math.round((closedWon / total) * 100) : 0;
    const pipeline = leads
      .filter((l) => !["Closed Won", "Closed Lost"].includes(l.status))
      .reduce((s, l) => s + (l.estimated_value ?? 0), 0);
    return { total, thisWeek, rate, pipeline };
  }, [leads]);

  const openAdd = () => { setEditLead(null); setForm(EMPTY_FORM); setShowSheet(true); };
  const openEdit = (lead: Lead) => {
    setEditLead(lead);
    setForm({
      x_handle: lead.x_handle,
      company: lead.company ?? "",
      follower_count: lead.follower_count?.toString() ?? "",
      source: lead.source,
      estimated_value: lead.estimated_value?.toString() ?? "",
      notes: lead.notes ?? "",
      follow_up_date: lead.follow_up_date ?? "",
    });
    setShowSheet(true);
  };

  const handleSave = async () => {
    if (!form.x_handle.trim()) { toast.error("X handle is required"); return; }
    setSaving(true);
    const supabase = createClient();
    const payload = {
      user_id: userId,
      x_handle: form.x_handle.trim().replace(/^@/, ""),
      company: form.company || null,
      follower_count: form.follower_count ? parseInt(form.follower_count) : null,
      source: form.source,
      estimated_value: form.estimated_value ? parseFloat(form.estimated_value) : null,
      notes: form.notes || null,
      follow_up_date: form.follow_up_date || null,
    };
    if (editLead) {
      const { data, error } = await supabase.from("leads").update(payload).eq("id", editLead.id).select().single();
      if (error) { toast.error(error.message); } else {
        setLeads((prev) => prev.map((l) => l.id === editLead.id ? data : l));
        toast.success("Lead updated");
        setShowSheet(false);
      }
    } else {
      const { data, error } = await supabase.from("leads").insert({ ...payload, status: "New", response: "No Reply" }).select().single();
      if (error) { toast.error(error.message); } else {
        setLeads((prev) => [data, ...prev]);
        toast.success("Lead added");
        setShowSheet(false);
      }
    }
    setSaving(false);
  };

  const handleToggle = async (lead: Lead, field: "engaged" | "dm_sent" | "mockup_sent") => {
    const supabase = createClient();
    const newVal = !lead[field];
    const extra: Record<string, any> = {};
    if (field === "dm_sent" && newVal) extra.dm_sent_date = new Date().toISOString().split("T")[0];
    await supabase.from("leads").update({ [field]: newVal, ...extra }).eq("id", lead.id);
    setLeads((prev) => prev.map((l) => l.id === lead.id ? { ...l, [field]: newVal, ...extra } : l));
  };

  const handleStatusChange = async (lead: Lead, status: LeadStatus) => {
    const supabase = createClient();
    await supabase.from("leads").update({ status }).eq("id", lead.id);
    setLeads((prev) => prev.map((l) => l.id === lead.id ? { ...l, status } : l));
    if (status === "Closed Won") toast.success("🎉 Lead closed! Consider converting to a project.", { duration: 5000 });
  };

  const handleResponseChange = async (lead: Lead, response: LeadResponse) => {
    const supabase = createClient();
    await supabase.from("leads").update({ response }).eq("id", lead.id);
    setLeads((prev) => prev.map((l) => l.id === lead.id ? { ...l, response } : l));
  };

  const handleDelete = async (id: string) => {
    const supabase = createClient();
    await supabase.from("leads").delete().eq("id", id);
    setLeads((prev) => prev.filter((l) => l.id !== id));
    toast.success("Lead removed");
    setShowSheet(false);
  };

  const exportCSV = () => {
    const headers = ["Date,Handle,Company,Source,Engaged,DM Sent,Response,Status,Value,Follow-up"];
    const rows = filtered.map((l) =>
      [l.date_found, l.x_handle, l.company ?? "", l.source, l.engaged, l.dm_sent, l.response, l.status, l.estimated_value ?? "", l.follow_up_date ?? ""].join(",")
    );
    const csv = [headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "leads.csv"; a.click();
  };

  const toggleSort = (key: keyof Lead) => {
    if (sortKey === key) setSortDir((d) => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const SortIcon = ({ col }: { col: keyof Lead }) =>
    sortKey === col ? (sortDir === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />) : null;

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Stats bar */}
      <div className="flex items-center gap-6 px-4 md:px-6 py-3 border-b border-slate-700/40 bg-slate-800/20 overflow-x-auto">
        {[
          { icon: Users, label: "Total", value: stats.total, color: "text-slate-300" },
          { icon: Calendar, label: "This Week", value: stats.thisWeek, color: "text-blue-400" },
          { icon: TrendingUp, label: "Conversion", value: `${stats.rate}%`, color: "text-emerald-400" },
          { icon: DollarSign, label: "Pipeline", value: formatCurrency(stats.pipeline), color: "text-amber-400" },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="flex items-center gap-1.5 shrink-0">
            <Icon className={cn("h-3.5 w-3.5", color)} />
            <span className="text-xs text-slate-500">{label}:</span>
            <span className={cn("text-xs font-semibold", color)}>{value}</span>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 md:px-6 py-3 border-b border-slate-700/40">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
          <Input placeholder="Search handle or company…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-8 h-8 text-xs" />
        </div>
        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-36 h-8 text-xs">
          <option value="All">All Statuses</option>
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </Select>
        <Button variant="outline" size="sm" onClick={exportCSV} className="h-8 gap-1">
          <Download className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">CSV</span>
        </Button>
        <Button size="sm" onClick={openAdd} className="h-8 gap-1 shrink-0">
          <Plus className="h-3.5 w-3.5" /> Add Lead
        </Button>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-3">
            <Users className="h-10 w-10 text-slate-700" />
            <p className="text-slate-500 text-sm">No leads found</p>
            <Button size="sm" onClick={openAdd}><Plus className="h-4 w-4 mr-1" />Add your first lead</Button>
          </div>
        ) : (
          <table className="w-full text-xs">
            <thead className="sticky top-0 bg-slate-900/95 backdrop-blur-sm">
              <tr className="border-b border-slate-700/40">
                {[
                  ["date_found", "Date"], ["x_handle", "Handle"], ["company", "Company"],
                  ["source", "Source"], ["engaged", "Engaged"], ["dm_sent", "DM"],
                  ["response", "Response"], ["status", "Status"],
                  ["estimated_value", "Value"], ["follow_up_date", "Follow-up"],
                ].map(([key, label]) => (
                  <th
                    key={key}
                    className="px-3 py-2.5 text-left font-medium text-slate-400 cursor-pointer hover:text-slate-200 whitespace-nowrap select-none"
                    onClick={() => toggleSort(key as keyof Lead)}
                  >
                    <span className="flex items-center gap-1">{label}<SortIcon col={key as keyof Lead} /></span>
                  </th>
                ))}
                <th className="px-3 py-2.5 text-right font-medium text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => {
                const followupDays = lead.follow_up_date ? getDaysUntil(lead.follow_up_date) : null;
                return (
                  <tr key={lead.id} className="border-b border-slate-700/20 hover:bg-slate-800/30 group">
                    <td className="px-3 py-2.5 text-slate-400 whitespace-nowrap">{formatDate(lead.date_found)}</td>
                    <td className="px-3 py-2.5">
                      <a
                        href={`https://x.com/${lead.x_handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        @{lead.x_handle}<ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 shrink-0" />
                      </a>
                    </td>
                    <td className="px-3 py-2.5 text-slate-300">{lead.company ?? "—"}</td>
                    <td className="px-3 py-2.5 text-slate-400">{lead.source}</td>
                    <td className="px-3 py-2.5">
                      <Switch checked={lead.engaged} onCheckedChange={() => handleToggle(lead, "engaged")} />
                    </td>
                    <td className="px-3 py-2.5">
                      <Switch checked={lead.dm_sent} onCheckedChange={() => handleToggle(lead, "dm_sent")} />
                    </td>
                    <td className="px-3 py-2.5">
                      <select
                        value={lead.response}
                        onChange={(e) => handleResponseChange(lead, e.target.value as LeadResponse)}
                        className="bg-transparent text-slate-300 text-xs border-none outline-none cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {RESPONSES.map((r) => <option key={r} className="bg-slate-800">{r}</option>)}
                      </select>
                    </td>
                    <td className="px-3 py-2.5">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead, e.target.value as LeadStatus)}
                        className="bg-transparent text-xs border-none outline-none cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                        style={{ color: lead.status === "Closed Won" ? "#34d399" : lead.status === "Closed Lost" ? "#f87171" : lead.status === "Negotiating" ? "#fbbf24" : "#a5b4fc" }}
                      >
                        {STATUSES.map((s) => <option key={s} className="bg-slate-800 text-slate-200">{s}</option>)}
                      </select>
                    </td>
                    <td className="px-3 py-2.5 text-emerald-400 font-medium">
                      {lead.estimated_value ? formatCurrency(lead.estimated_value) : "—"}
                    </td>
                    <td className="px-3 py-2.5">
                      {lead.follow_up_date ? (
                        <span className={cn("flex items-center gap-1", followupDays !== null && followupDays < 0 ? "text-red-400" : followupDays === 0 ? "text-amber-400" : "text-slate-400")}>
                          {followupDays !== null && followupDays <= 1 && <AlertTriangle className="h-3 w-3" />}
                          {formatDate(lead.follow_up_date)}
                        </span>
                      ) : "—"}
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px] opacity-0 group-hover:opacity-100" onClick={() => openEdit(lead)}>
                        Edit
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Add/Edit Sheet */}
      <Sheet open={showSheet} onClose={() => setShowSheet(false)} title={editLead ? `Edit @${editLead.x_handle}` : "Add New Lead"} width="w-[480px]">
        <div className="space-y-4">
          <FormField label="X Handle" required>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">@</span>
              <Input placeholder="username" value={form.x_handle} onChange={(e) => setForm((f) => ({ ...f, x_handle: e.target.value.replace(/^@/, "") }))} className="pl-7" />
            </div>
          </FormField>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Company">
              <Input placeholder="Company name" value={form.company} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))} />
            </FormField>
            <FormField label="Followers">
              <Input type="number" placeholder="10000" value={form.follower_count} onChange={(e) => setForm((f) => ({ ...f, follower_count: e.target.value }))} />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Source">
              <Select value={form.source} onChange={(e) => setForm((f) => ({ ...f, source: e.target.value }))}>
                {SOURCES.map((s) => <option key={s}>{s}</option>)}
              </Select>
            </FormField>
            <FormField label="Est. Value ($)">
              <Input type="number" placeholder="1500" value={form.estimated_value} onChange={(e) => setForm((f) => ({ ...f, estimated_value: e.target.value }))} />
            </FormField>
          </div>
          <FormField label="Follow-up Date">
            <Input type="date" value={form.follow_up_date} onChange={(e) => setForm((f) => ({ ...f, follow_up_date: e.target.value }))} />
          </FormField>
          <FormField label="Notes">
            <textarea
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              placeholder="Any context about this lead…"
              className="flex min-h-[80px] w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />
          </FormField>
          <div className="flex gap-2 pt-2">
            <Button onClick={handleSave} disabled={saving} className="flex-1">
              {saving ? "Saving…" : editLead ? "Update Lead" : "Add Lead"}
            </Button>
            {editLead && (
              <Button variant="destructive" onClick={() => handleDelete(editLead.id)}>Delete</Button>
            )}
          </div>
        </div>
      </Sheet>
    </div>
  );
}
