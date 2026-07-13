#!/usr/bin/env node
/**
 * Smoke-check production (or any) deployment.
 * Usage:
 *   node scripts/verify-production.mjs
 *   CRON_SECRET=xxx node scripts/verify-production.mjs
 */
const SITE = process.env.SITE_URL ?? "https://zpdlearning.com";
const CRON_SECRET = process.env.CRON_SECRET;

const checks = [];

const check = async (name, fn) => {
  try {
    await fn();
    checks.push({ name, ok: true });
    console.warn(`✓ ${name}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    checks.push({ name, ok: false, message });
    console.error(`✗ ${name}: ${message}`);
  }
};

await check("Site /enrol", async () => {
  const res = await fetch(`${SITE}/enrol`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
});

await check("Site /enrol/insights", async () => {
  const res = await fetch(`${SITE}/enrol/insights`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
});

await check("Stripe webhook GET", async () => {
  const res = await fetch(`${SITE}/api/webhooks/stripe`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (!data.ok) throw new Error("unexpected response");
});

await check("Cron rejects unauthenticated requests", async () => {
  const res = await fetch(`${SITE}/api/cron/nurture`);
  if (res.status !== 401) throw new Error(`expected 401, got ${res.status}`);
});

if (CRON_SECRET) {
  await check("Cron with CRON_SECRET", async () => {
    const res = await fetch(`${SITE}/api/cron/nurture`, {
      headers: { Authorization: `Bearer ${CRON_SECRET}` },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data.ok) throw new Error(JSON.stringify(data));
  });
} else {
  console.warn("○ Cron authenticated test skipped (set CRON_SECRET)");
}

const failed = checks.filter((c) => !c.ok);
process.exit(failed.length > 0 ? 1 : 0);