"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Users, Briefcase, CheckSquare, DollarSign,
} from "lucide-react";

const mobileNav = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Home" },
  { href: "/leads", icon: Users, label: "Leads" },
  { href: "/projects", icon: Briefcase, label: "Projects" },
  { href: "/checklist", icon: CheckSquare, label: "Checklist" },
  { href: "/budget", icon: DollarSign, label: "Budget" },
];

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 border-t border-slate-700/60 bg-slate-900/95 backdrop-blur-sm">
      <div className="flex items-stretch">
        {mobileNav.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors",
                active ? "text-indigo-400" : "text-slate-500"
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
