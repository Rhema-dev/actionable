"use client";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useEffect } from "react";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  side?: "right" | "left";
  width?: string;
}

export function Sheet({
  open,
  onClose,
  title,
  children,
  className,
  side = "right",
  width = "w-[520px]",
}: SheetProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      <div
        className={cn(
          "fixed top-0 z-50 h-full bg-slate-900 border-slate-700 shadow-2xl transition-transform duration-300 flex flex-col",
          width,
          "max-w-full",
          side === "right" ? "right-0 border-l" : "left-0 border-r",
          open
            ? "translate-x-0"
            : side === "right"
            ? "translate-x-full"
            : "-translate-x-full",
          className
        )}
      >
        {title && (
          <div className="flex shrink-0 items-center justify-between border-b border-slate-700 px-5 py-4">
            <h2 className="text-base font-semibold text-slate-200">{title}</h2>
            <button
              onClick={onClose}
              className="rounded-md p-1 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </div>
    </>
  );
}
