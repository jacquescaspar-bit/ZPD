import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const EmptyState = ({ icon: Icon, title, description }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-16 text-center">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
      <Icon className="h-6 w-6 text-slate-400" />
    </div>
    <h3 className="mt-4 text-base font-medium text-slate-900">{title}</h3>
    <p className="mt-2 max-w-sm text-sm text-slate-500">{description}</p>
  </div>
);

export default EmptyState;
