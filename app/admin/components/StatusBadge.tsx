import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "success" | "warning" | "neutral" | "danger" | "info";

interface StatusBadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
}

const toneClasses: Record<BadgeTone, string> = {
  success: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  warning: "bg-amber-50 text-amber-700 ring-amber-600/20",
  neutral: "bg-slate-100 text-slate-700 ring-slate-500/10",
  danger: "bg-rose-50 text-rose-700 ring-rose-600/20",
  info: "bg-blue-50 text-blue-700 ring-blue-600/20",
};

const StatusBadge = ({ children, tone = "neutral" }: StatusBadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
      toneClasses[tone],
    )}
  >
    {children}
  </span>
);

export default StatusBadge;
