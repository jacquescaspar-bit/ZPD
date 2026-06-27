export const ADMIN_COOKIE = "zpd_admin_session";
const SESSION_MS = 7 * 24 * 60 * 60 * 1000;

function getAdminSecret(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (password) return password;
  if (process.env.NODE_ENV === "development") return "zpd-dev-admin";
  return "";
}

export function isAdminAuthConfigured(): boolean {
  return Boolean(getAdminSecret());
}

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

export async function createAdminSession(): Promise<string | null> {
  const secret = getAdminSecret();
  if (!secret) return null;

  const expires = Date.now() + SESSION_MS;
  const payload = `admin:${expires}`;
  const signature = await hmacSign(payload, secret);
  return `${expires}.${signature}`;
}

export async function verifyAdminSession(
  token: string | undefined,
): Promise<boolean> {
  if (!token) return false;

  const secret = getAdminSecret();
  if (!secret) return false;

  const [expiresRaw, signature] = token.split(".");
  if (!expiresRaw || !signature) return false;

  const expires = Number(expiresRaw);
  if (!Number.isFinite(expires) || Date.now() > expires) return false;

  const payload = `admin:${expires}`;
  const expected = await hmacSign(payload, secret);

  if (expected.length !== signature.length) return false;

  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) {
    mismatch |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  }
  return mismatch === 0;
}

export function verifyAdminPassword(password: string): boolean {
  const configured = process.env.ADMIN_PASSWORD;
  if (!configured) {
    return process.env.NODE_ENV === "development";
  }
  return password === configured;
}
