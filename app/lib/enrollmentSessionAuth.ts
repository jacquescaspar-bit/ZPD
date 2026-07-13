import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const firstNonEmpty = (...values: (string | undefined)[]): string => {
  for (const value of values) {
    if (value?.trim()) return value.trim();
  }
  return "";
};

const getSessionSecret = (): string =>
  firstNonEmpty(
    process.env.ENROLLMENT_SESSION_SECRET,
    process.env.CRON_SECRET,
    process.env.ADMIN_PASSWORD,
  );

async function hmacSign(message: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(message),
  );
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function createEnrollmentSessionToken(
  sessionId: string,
  expiresAt: Date,
): Promise<string | null> {
  const secret = getSessionSecret();
  if (!secret) return null;

  const expires = new Date(expiresAt).getTime();
  if (!Number.isFinite(expires)) return null;
  const signature = await hmacSign(`${sessionId}:${expires}`, secret);
  return `${expires}.${signature}`;
}

export async function verifyEnrollmentSessionToken(
  sessionId: string,
  token: string | null | undefined,
): Promise<boolean> {
  if (!token) return false;

  const secret = getSessionSecret();
  if (!secret) return false;

  const [expiresRaw, signature] = token.split(".");
  if (!expiresRaw || !signature) return false;

  const expires = Number(expiresRaw);
  if (!Number.isFinite(expires) || Date.now() > expires) return false;

  const expected = await hmacSign(`${sessionId}:${expires}`, secret);
  if (expected.length !== signature.length) return false;

  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) {
    mismatch |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  }
  return mismatch === 0;
}

export function getEnrollmentSessionTokenFromRequest(
  request: NextRequest,
): string | null {
  return (
    request.headers.get("x-enrollment-session-token") ??
    request.nextUrl.searchParams.get("token")
  );
}

export async function requireEnrollmentSessionAccess(
  request: NextRequest,
  sessionId: string,
): Promise<NextResponse | null> {
  const token = getEnrollmentSessionTokenFromRequest(request);
  const allowed = await verifyEnrollmentSessionToken(sessionId, token);
  if (!allowed) {
    return NextResponse.json(
      { error: "Unauthorized session access" },
      { status: 401 },
    );
  }
  return null;
}
