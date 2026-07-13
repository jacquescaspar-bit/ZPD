#!/usr/bin/env node
/**
 * Smoke-test: skip payment → insights session → referral code claim.
 * Usage: node scripts/smoke-enrol-referral.mjs
 */
const BASE = process.env.SMOKE_BASE_URL ?? "http://localhost:3000";
const email = `smoke-${Date.now()}@zpd-test.local`;
const sessionId = crypto.randomUUID();
const paymentIntentId = `test_payment_intent_${Date.now()}`;

const check = async (name, fn) => {
  try {
    await fn();
    console.warn(`✓ ${name}`);
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`✗ ${name}: ${message}`);
    return false;
  }
};

let accessToken = null;
let referralCode = null;

await check("POST /api/enrollment-sessions (insights step)", async () => {
  const res = await fetch(`${BASE}/api/enrollment-sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionId,
      email,
      currentStep: "insights",
      enrollmentData: {
        plan: "essential",
        parentName: "Smoke Test",
        email,
        finalAmountCents: 95000,
      },
      insightsData: {},
      progressStatus: {},
      stripePaymentIntentId: paymentIntentId,
    }),
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  }
  const data = await res.json();
  accessToken = data.accessToken;
  if (!accessToken) throw new Error("missing accessToken");
  if (data.session?.sessionId !== sessionId) throw new Error("sessionId mismatch");
});

await check("GET /api/enrollment-sessions/[id] with token", async () => {
  const res = await fetch(`${BASE}/api/enrollment-sessions/${sessionId}`, {
    headers: { "X-Enrollment-Session-Token": accessToken },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (data.session?.currentStep !== "insights") {
    throw new Error(`expected insights, got ${data.session?.currentStep}`);
  }
});

await check("GET /enrol/insights page", async () => {
  const url = `${BASE}/enrol/insights?session=${sessionId}&token=${encodeURIComponent(accessToken)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();
  if (!html.includes("Your Learning Journey")) {
    throw new Error("insights page missing expected heading");
  }
});

await check("POST /api/referral-codes/claim", async () => {
  const res = await fetch(`${BASE}/api/referral-codes/claim`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      paymentIntentId,
      planType: "essential",
      amountCents: 95000,
    }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  const data = await res.json();
  referralCode = data.referralCode?.code;
  if (!referralCode?.startsWith("REF-")) {
    throw new Error(`unexpected code: ${referralCode ?? "null"}`);
  }
});

await check("Claim is idempotent (same code on retry)", async () => {
  const res = await fetch(`${BASE}/api/referral-codes/claim`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, paymentIntentId, planType: "essential" }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (data.referralCode?.code !== referralCode) {
    throw new Error("duplicate claim returned different code");
  }
});

await check("Blocked public email lookup still returns 403", async () => {
  const res = await fetch(
    `${BASE}/api/referral-codes?email=${encodeURIComponent(email)}`,
  );
  if (res.status !== 403) {
    throw new Error(`expected 403, got ${res.status}`);
  }
});

console.warn("\nSmoke test complete.");
console.warn(`  session: ${sessionId}`);
console.warn(`  referral: ${referralCode}`);
console.warn(
  `  insights: ${BASE}/enrol/insights?session=${sessionId}&token=${encodeURIComponent(accessToken)}`,
);