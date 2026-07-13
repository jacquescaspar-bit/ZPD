export const ENROLLMENT_SESSION_ID_KEY = "enrollmentSessionId";
export const ENROLLMENT_SESSION_TOKEN_KEY = "enrollmentSessionToken";

export function getStoredEnrollmentSessionId(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(ENROLLMENT_SESSION_ID_KEY);
}

export function getStoredEnrollmentSessionToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(ENROLLMENT_SESSION_TOKEN_KEY);
}

export function clearEnrollmentSessionAccess(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(ENROLLMENT_SESSION_ID_KEY);
  sessionStorage.removeItem(ENROLLMENT_SESSION_TOKEN_KEY);
}

/** Drop stale pre-auth session ids that have no access token. */
export function resolveEnrollmentSessionCredentials(): {
  sessionId: string | null;
  token: string | null;
} {
  const sessionId = getStoredEnrollmentSessionId();
  const token = getStoredEnrollmentSessionToken();

  if (sessionId && !token) {
    sessionStorage.removeItem(ENROLLMENT_SESSION_ID_KEY);
    return { sessionId: null, token: null };
  }

  return { sessionId, token };
}

export function storeEnrollmentSessionAccess(
  sessionId: string,
  accessToken?: string | null,
): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(ENROLLMENT_SESSION_ID_KEY, sessionId);
  if (accessToken) {
    sessionStorage.setItem(ENROLLMENT_SESSION_TOKEN_KEY, accessToken);
  }
}

export function getEnrollmentSessionHeaders(
  token?: string | null,
): HeadersInit {
  const resolvedToken = token ?? getStoredEnrollmentSessionToken();
  if (!resolvedToken) return {};
  return { "X-Enrollment-Session-Token": resolvedToken };
}

export function buildClientInsightsResumeUrl(
  sessionId: string,
  accessToken?: string | null,
  origin?: string,
): string {
  const baseOrigin =
    origin ?? (typeof window !== "undefined" ? window.location.origin : "");
  const url = new URL("/enrol/insights", baseOrigin);
  url.searchParams.set("session", sessionId);
  if (accessToken) {
    url.searchParams.set("token", accessToken);
  }
  return url.toString();
}

interface CreateEnrollmentSessionPayload {
  sessionId: string;
  email?: string;
  currentStep: "payment" | "insights";
  enrollmentData: Record<string, unknown>;
  insightsData?: Record<string, unknown>;
  progressStatus?: Record<string, unknown>;
  stripePaymentIntentId?: string;
}

export function createEnrollmentSession(
  payload: CreateEnrollmentSessionPayload,
): Promise<Response> {
  return fetch("/api/enrollment-sessions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

/** Create a session, retrying once if a stale browser id collides (409). */
export async function createEnrollmentSessionWithRetry(
  buildPayload: (sessionId: string) => CreateEnrollmentSessionPayload,
): Promise<{
  sessionId: string;
  accessToken: string | null;
} | null> {
  let sessionId = crypto.randomUUID();
  let response = await createEnrollmentSession(buildPayload(sessionId));

  if (response.status === 409) {
    clearEnrollmentSessionAccess();
    sessionId = crypto.randomUUID();
    response = await createEnrollmentSession(buildPayload(sessionId));
  }

  if (!response.ok) return null;

  const result = await response.json();
  const resolvedSessionId = result.session?.sessionId ?? sessionId;
  const accessToken = (result.accessToken as string | null | undefined) ?? null;
  storeEnrollmentSessionAccess(resolvedSessionId, accessToken);
  return { sessionId: resolvedSessionId, accessToken };
}
