import { type NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, verifyAdminSession } from "@/lib/adminAuth";

const PUBLIC_ADMIN_PATHS = ["/admin/login", "/api/admin/auth/login"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPage = pathname.startsWith("/admin");
  const isAdminApi =
    pathname.startsWith("/api/admin") && !PUBLIC_ADMIN_PATHS.includes(pathname);
  const isLegacyReferralAnalytics = pathname === "/api/analytics/referrals";

  if (!isAdminPage && !isAdminApi && !isLegacyReferralAnalytics) {
    return NextResponse.next();
  }

  if (PUBLIC_ADMIN_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const valid = await verifyAdminSession(token);

  if (valid) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/api/analytics/referrals"],
};
