import { type NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  createAdminSession,
  isAdminAuthConfigured,
  verifyAdminPassword,
} from "@/lib/adminAuth";

export async function POST(request: NextRequest) {
  try {
    if (!isAdminAuthConfigured()) {
      return NextResponse.json(
        {
          error:
            "Admin access is not configured. Set ADMIN_PASSWORD in your environment.",
        },
        { status: 503 },
      );
    }

    const { password } = await request.json();

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 },
      );
    }

    if (!verifyAdminPassword(password)) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const session = await createAdminSession();
    if (!session) {
      return NextResponse.json(
        { error: "Failed to create session" },
        { status: 500 },
      );
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set(ADMIN_COOKIE, session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
