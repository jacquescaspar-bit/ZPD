import { redirect } from "next/navigation";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  // Simple admin check - in production you'd want proper authentication
  // For now, we'll check if we're in development or have an admin cookie
  const isAdmin =
    process.env.NODE_ENV === "development" ||
    // Add your admin email check here
    true; // Temporary - replace with proper auth

  if (!isAdmin) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">ZPD Admin</h1>
            <nav className="flex space-x-6">
              <a
                className="text-gray-600 hover:text-gray-900 font-medium"
                href="/admin/stats"
              >
                Dashboard
              </a>
              <a
                className="text-gray-600 hover:text-gray-900 font-medium"
                href="/admin/promo-codes"
              >
                Promo Codes
              </a>
              <a
                className="text-gray-600 hover:text-gray-900 font-medium"
                href="/admin/referrals"
              >
                Referrals
              </a>
              <a
                className="text-gray-600 hover:text-gray-900 font-medium"
                href="/"
              >
                ← Back to Site
              </a>
            </nav>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
};

export default AdminLayout;
