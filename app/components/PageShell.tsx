import { cn } from "@/lib/utils";

export const PAGE_GRADIENT_CLASS = "min-h-screen bg-stone-50 dark:bg-stone-900";

interface PageShellProps {
  children: React.ReactNode;
  className?: string;
}

const PageShell = ({ children, className }: PageShellProps) => (
  <div className={cn("relative", PAGE_GRADIENT_CLASS, className)}>
    {children}
  </div>
);

export default PageShell;
