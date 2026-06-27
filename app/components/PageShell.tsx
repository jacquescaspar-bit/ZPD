import { cn } from "@/lib/utils";

export const PAGE_GRADIENT_CLASS =
  "min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900";

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
