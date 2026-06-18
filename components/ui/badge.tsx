import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info" | "violet" | "gray" | "amber" | "blue" | "indigo";
}

const variants = {
  default: "bg-slate-700 text-slate-300",
  success: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  warning: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
  danger: "bg-red-500/20 text-red-400 border border-red-500/30",
  info: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  violet: "bg-violet-500/20 text-violet-400 border border-violet-500/30",
  gray: "bg-slate-700/50 text-slate-400 border border-slate-600",
  amber: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
  blue: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  indigo: "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30",
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
