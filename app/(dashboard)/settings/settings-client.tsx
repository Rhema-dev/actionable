"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField } from "@/components/ui/form-field";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import type { Profile } from "@/types/database";
import { User, DollarSign, Globe, CheckCircle2, Save } from "lucide-react";

interface SettingsClientProps {
  profile: Profile | null;
  userId: string;
  userEmail: string;
}

export function SettingsClient({ profile: initialProfile, userId, userEmail }: SettingsClientProps) {
  const [profile, setProfile] = useState<Profile | null>(initialProfile);
  const [form, setForm] = useState({
    full_name: initialProfile?.full_name ?? "",
    business_name: initialProfile?.business_name ?? "",
    x_handle: initialProfile?.x_handle ?? "",
    youtube_channel: initialProfile?.youtube_channel ?? "",
    hourly_rate: initialProfile?.hourly_rate?.toString() ?? "",
    monthly_revenue_goal: initialProfile?.monthly_revenue_goal?.toString() ?? "3000",
    pc_goal_target: initialProfile?.pc_goal_target?.toString() ?? "3000",
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const supabase = createClient();
    const { data, error } = await supabase.from("profiles").upsert({
      id: userId,
      full_name: form.full_name || null,
      business_name: form.business_name || null,
      x_handle: form.x_handle || null,
      youtube_channel: form.youtube_channel || null,
      hourly_rate: form.hourly_rate ? parseFloat(form.hourly_rate) : null,
      monthly_revenue_goal: parseFloat(form.monthly_revenue_goal) || 3000,
      pc_goal_target: parseFloat(form.pc_goal_target) || 3000,
    }).select().single();
    if (error) { toast.error(error.message); } else {
      setProfile(data);
      toast.success("Settings saved!");
    }
    setSaving(false);
  };

  const isConnected = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

  return (
    <div className="flex-1 overflow-auto p-4 md:p-6 max-w-2xl">
      <div className="space-y-6">
        {/* Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-4 w-4 text-indigo-400" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Full Name">
                <Input value={form.full_name} onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))} placeholder="Your name" />
              </FormField>
              <FormField label="Business Name">
                <Input value={form.business_name} onChange={(e) => setForm((f) => ({ ...f, business_name: e.target.value }))} placeholder="My Motion Studio" />
              </FormField>
            </div>
            <FormField label="Email" hint="Managed by Supabase auth">
              <Input value={userEmail} disabled className="opacity-50" />
            </FormField>
          </CardContent>
        </Card>

        {/* Socials */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-blue-400" />
              Social Profiles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField label="X (Twitter) Handle">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">@</span>
                <Input value={form.x_handle} onChange={(e) => setForm((f) => ({ ...f, x_handle: e.target.value }))} placeholder="yourhandle" className="pl-7" />
              </div>
            </FormField>
            <FormField label="YouTube Channel URL">
              <Input value={form.youtube_channel} onChange={(e) => setForm((f) => ({ ...f, youtube_channel: e.target.value }))} placeholder="youtube.com/@channel" />
            </FormField>
          </CardContent>
        </Card>

        {/* Business Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-emerald-400" />
              Business Goals & Rates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <FormField label="Hourly Rate ($)">
                <Input type="number" value={form.hourly_rate} onChange={(e) => setForm((f) => ({ ...f, hourly_rate: e.target.value }))} placeholder="75" />
              </FormField>
              <FormField label="Monthly Revenue Goal ($)">
                <Input type="number" value={form.monthly_revenue_goal} onChange={(e) => setForm((f) => ({ ...f, monthly_revenue_goal: e.target.value }))} placeholder="3000" />
              </FormField>
              <FormField label="PC Fund Target ($)">
                <Input type="number" value={form.pc_goal_target} onChange={(e) => setForm((f) => ({ ...f, pc_goal_target: e.target.value }))} placeholder="3000" />
              </FormField>
            </div>
          </CardContent>
        </Card>

        {/* Pricing Reference */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "60-sec Launch/Explainer", range: "$1,200 – $2,000", note: "Standard package" },
                { name: "Premium (script + revisions + sound)", range: "$2,000 – $3,500", note: "Full-service" },
                { name: "Onboarding Series (4–6 clips)", range: "$2,500 – $4,000", note: "Series pricing" },
              ].map((tier) => (
                <div key={tier.name} className="flex items-center justify-between py-3 border-b border-slate-700/40 last:border-0">
                  <div>
                    <p className="text-sm text-slate-300">{tier.name}</p>
                    <p className="text-xs text-slate-500">{tier.note}</p>
                  </div>
                  <span className="text-sm font-bold text-emerald-400">{tier.range}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-600 mt-3">Raise prices after you have 5+ testimonials.</p>
          </CardContent>
        </Card>

        {/* Supabase Status */}
        <Card>
          <CardHeader><CardTitle>Database Connection</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className={`h-2.5 w-2.5 rounded-full ${isConnected ? "bg-emerald-400 animate-pulse" : "bg-red-400"}`} />
              <span className="text-sm text-slate-300">
                {isConnected ? "Connected to Supabase" : "Not configured — add env vars"}
              </span>
              {isConnected && <Badge variant="success">Active</Badge>}
            </div>
            {!isConnected && (
              <p className="text-xs text-slate-500 mt-2">Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local</p>
            )}
          </CardContent>
        </Card>

        <Button onClick={handleSave} disabled={saving} className="w-full gap-2">
          <Save className="h-4 w-4" />
          {saving ? "Saving…" : "Save All Settings"}
        </Button>
      </div>
    </div>
  );
}
