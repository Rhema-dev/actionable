"use client";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline" | "destructive" | "success" | "secondary";
  size?: "sm" | "md" | "lg" | "icon";
}

const variants = {
  default: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm",
  ghost: "hover:bg-white/10 text-slate-300 hover:text-white",
  outline: "border border-slate-700 hover:border-slate-500 hover:bg-white/5 text-slate-300",
  destructive: "bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-600/30",
  success: "bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-600/30",
  secondary: "bg-slate-700 hover:bg-slate-600 text-slate-200",
};

const sizes = {
  sm: "h-7 px-2.5 text-xs gap-1.5",
  md: "h-9 px-4 text-sm gap-2",
  lg: "h-11 px-6 text-base gap-2",
  icon: "h-9 w-9 p-0",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);
Button.displayName = "Button";
