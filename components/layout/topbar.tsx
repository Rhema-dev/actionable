"use client";
import { Bell, Menu } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface TopbarProps {
  title: string;
  onMobileMenuOpen?: () => void;
}

export function Topbar({ title, onMobileMenuOpen }: TopbarProps) {
  const [notifCount, setNotifCount] = useState(0);

  useEffect(() => {
    const fetchNotifs = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const today = new Date().toISOString().split("T")[0];
      const threeDays = new Date();
      threeDays.setDate(threeDays.getDate() + 3);
      const threeDaysStr = threeDays.toISOString().split("T")[0];

      const [{ count: followupCount }, { count: projectCount }] = await Promise.all([
        supabase
          .from("leads")
          .select("id", { count: "exact", head: true })
          .lte("follow_up_date", threeDaysStr)
          .not("status", "in", '("Closed Won","Closed Lost")')
          .eq("user_id", user.id),
        supabase
          .from("projects")
          .select("id", { count: "exact", head: true })
          .lte("deadline", threeDaysStr)
          .gte("deadline", today)
          .not("status", "in", '("Completed","Cancelled")')
          .eq("user_id", user.id),
      ]);
      setNotifCount((followupCount ?? 0) + (projectCount ?? 0));
    };
    fetchNotifs();
  }, []);

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-700/60 bg-slate-900/60 backdrop-blur-sm px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-1.5 rounded-lg hover:bg-slate-700 text-slate-400"
          onClick={onMobileMenuOpen}
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-base font-semibold text-slate-100">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden sm:block text-sm text-slate-500">
          {format(new Date(), "MMM d, yyyy")}
        </span>
        <Link
          href="/leads?filter=followup"
          className="relative p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <Bell className="h-5 w-5" />
          {notifCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {notifCount > 9 ? "9+" : notifCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
