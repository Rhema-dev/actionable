"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard, Users, Briefcase, Calendar, CheckSquare,
  DollarSign, Monitor, Target, MessageCircle, Settings,
  ChevronLeft, ChevronRight, Zap, LogOut, Crosshair,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/leads", icon: Users, label: "Leads" },
  { href: "/projects", icon: Briefcase, label: "Projects" },
  { href: "/content", icon: Calendar, label: "Content" },
  { href: "/checklist", icon: CheckSquare, label: "Checklist" },
  { href: "/budget", icon: DollarSign, label: "Budget" },
  { href: "/pc-fund", icon: Monitor, label: "PC Fund" },
  { href: "/goals", icon: Target, label: "Goals" },
  { href: "/templates", icon: MessageCircle, label: "Templates" },
  { href: "/lead-hunting", icon: Crosshair, label: "Lead Hunting" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

interface SidebarProps {
  user: { email?: string | null; full_name?: string | null } | null;
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col shrink-0 border-r border-slate-700/60 bg-slate-900/80 backdrop-blur-sm transition-all duration-300 h-full",
        collapsed ? "w-16" : "w-56"
      )}
    >
      {/* Logo */}
      <div className={cn("flex items-center gap-2 px-4 py-4 border-b border-slate-700/60", collapsed && "justify-center px-2")}>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600">
          <Zap className="h-4 w-4 text-white" />
        </div>
        {!collapsed && (
          <span className="font-bold text-slate-100 text-base tracking-tight">Actionable</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors group",
                active
                  ? "bg-indigo-600/20 text-indigo-400"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? label : undefined}
            >
              <Icon className={cn("h-4 w-4 shrink-0", active ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300")} />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-700/60 p-2 space-y-1">
        {!collapsed && user && (
          <div className="px-2.5 py-2">
            <p className="text-xs font-medium text-slate-300 truncate">
              {user.full_name || user.email}
            </p>
            <p className="text-xs text-slate-500 truncate">{user.email}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-red-400 transition-colors",
            collapsed && "justify-center px-2"
          )}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && "Sign Out"}
        </button>
        <button
          onClick={() => setCollapsed((v) => !v)}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-slate-500 hover:bg-slate-800 hover:text-slate-300 transition-colors",
            collapsed && "justify-center px-2"
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
