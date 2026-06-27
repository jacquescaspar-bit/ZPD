import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  className?: string;
}

const StatCard = ({
  label,
  value,
  subtext,
  icon: Icon,
  trend,
  trendUp,
  className,
}: StatCardProps) => (
  <div
    className={cn(
      "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm",
      className,
    )}
  >
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
          {value}
        </p>
        {subtext && <p className="mt-1 text-sm text-slate-500">{subtext}</p>}
        {trend && (
          <p
            className={cn(
              "mt-2 text-sm font-medium",
              trendUp ? "text-emerald-600" : "text-slate-500",
            )}
          >
            {trend}
          </p>
        )}
      </div>
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white">
        <Icon className="h-5 w-5" />
      </div>
    </div>
  </div>
);

export default StatCard;
