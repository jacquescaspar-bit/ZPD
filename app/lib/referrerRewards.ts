import { query } from "@/lib/db";
import { REFERRAL_VALUE } from "@/enrol/constants";
import { PromoCodeStorage } from "@/lib/promoStorage";

function generateRewardCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "RWD-";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function createReferrerRewardPromo(
  ownerEmail: string,
): Promise<string> {
  const normalizedEmail = ownerEmail.toLowerCase().trim();
  const expiresAt = new Date();
  expiresAt.setFullYear(expiresAt.getFullYear() + 1);

  let code = generateRewardCode();
  for (let attempt = 0; attempt < 8; attempt++) {
    const existing = await query("SELECT id FROM promo_codes WHERE code = $1", [
      code,
    ]);
    if (existing.rows.length === 0) break;
    code = generateRewardCode();
  }

  await PromoCodeStorage.createPromoCode({
    code,
    discountCents: REFERRAL_VALUE,
    description: "$100 off your next Essential or Intensive term",
    maxUses: 1,
    expiresAt: expiresAt.toISOString(),
    allowedPlans: ["essential", "intensive"],
    ownerEmail: normalizedEmail,
  });

  return code;
}
