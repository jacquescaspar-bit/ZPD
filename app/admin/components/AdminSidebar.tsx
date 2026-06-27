"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  ExternalLink,
  Gift,
  LayoutDashboard,
  LogOut,
  Ticket,
  UserPlus,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin/stats", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/enrollments", label: "Enrollments", icon: Users },
  { href: "/admin/sessions", label: "Funnel", icon: UserPlus },
  { href: "/admin/promo-codes", label: "Promo Codes", icon: Ticket },
  { href: "/admin/referrals", label: "Referrals", icon: Gift },
];

const AdminSidebar = () => {
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-slate-800 bg-slate-950 text-white">
      <div className="border-b border-slate-800 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sm font-bold text-slate-950">
            ZPD
          </div>
          <div>
            <p className="text-sm font-semibold">ZPD Admin</p>
            <p className="text-xs text-slate-400">Operations console</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-white text-slate-950"
                  : "text-slate-300 hover:bg-slate-900 hover:text-white",
              )}
              href={item.href}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-slate-800 px-3 py-4">
        <Link
          className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-900 hover:text-white"
          href="/"
          target="_blank"
        >
          <ExternalLink className="h-4 w-4" />
          View site
        </Link>
        <button
          className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-900 hover:text-white"
          type="button"
          onClick={() => void handleLogout()}
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>

      <div className="border-t border-slate-800 px-6 py-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <BarChart3 className="h-3.5 w-3.5" />
          Live enrollment data
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
