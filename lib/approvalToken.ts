import crypto from "crypto";

/**
 * Signs an application id with a server-only secret. The applicant never
 * sees this value — it exists only inside the admin alert email, so only
 * someone holding that email can trigger a quick approval.
 */
export function signApplicationId(id: string) {
  return crypto
    .createHmac("sha256", process.env.QUICK_APPROVE_SECRET || "")
    .update(id)
    .digest("hex");
}

export function verifyApplicationToken(id: string, token: string) {
  const expected = signApplicationId(id);
  if (token.length !== expected.length) return false;
  return crypto.timingSafeEqual(
    Buffer.from(token),
    Buffer.from(expected)
  );
}
