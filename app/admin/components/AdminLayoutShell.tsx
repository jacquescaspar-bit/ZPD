"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/admin/components/AdminSidebar";

const AdminLayoutShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex min-h-screen">
        <div className="hidden lg:block">
          <AdminSidebar />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
            <p className="text-sm font-semibold text-slate-900">ZPD Admin</p>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 text-xs">
              <a
                className="cursor-pointer whitespace-nowrap rounded-full bg-slate-900 px-3 py-1.5 font-medium text-white"
                href="/admin/stats"
              >
                Dashboard
              </a>
              <a
                className="cursor-pointer whitespace-nowrap rounded-full bg-slate-100 px-3 py-1.5 font-medium text-slate-700"
                href="/admin/enrollments"
              >
                Enrollments
              </a>
              <a
                className="cursor-pointer whitespace-nowrap rounded-full bg-slate-100 px-3 py-1.5 font-medium text-slate-700"
                href="/admin/sessions"
              >
                Funnel
              </a>
              <a
                className="cursor-pointer whitespace-nowrap rounded-full bg-slate-100 px-3 py-1.5 font-medium text-slate-700"
                href="/admin/promo-codes"
              >
                Promos
              </a>
              <a
                className="cursor-pointer whitespace-nowrap rounded-full bg-slate-100 px-3 py-1.5 font-medium text-slate-700"
                href="/admin/referrals"
              >
                Referrals
              </a>
            </div>
          </div>
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayoutShell;
