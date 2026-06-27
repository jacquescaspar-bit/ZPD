import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/adminAuth";
import { requireAdmin } from "@/lib/adminApi";

export async function POST() {
  const authError = await requireAdmin();
  if (authError) return authError;

  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
