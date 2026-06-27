import AdminLayoutShell from "@/admin/components/AdminLayoutShell";

const AdminLayout = ({ children }: { children: React.ReactNode }) => (
  <AdminLayoutShell>{children}</AdminLayoutShell>
);

export default AdminLayout;
