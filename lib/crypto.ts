import crypto from "crypto";

/** Why: Codes are short; salt+hash protects if DB leaks. */
export function generateCode(length = 6, charset = "0123456789"): string {
  const bytes = crypto.randomBytes(length);
  let out = "";
  for (let i = 0; i < length; i++) out += charset[bytes[i] % charset.length];
  return out;
}
export function generateSalt(bytes = 16): string {
  return crypto.randomBytes(bytes).toString("hex");
}
export function hashCode(code: string, salt: string): string {
  return crypto.createHash("sha256").update(`${salt}:${code}`).digest("hex");
}
export function timingSafeEqHex(aHex: string, bHex: string): boolean {
  const a = Buffer.from(aHex, "hex");
  const b = Buffer.from(bHex, "hex");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
/** In production prefer argon2id; scrypt here keeps deps minimal. */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derived = crypto.scryptSync(password, salt, 64).toString("hex");
  return `scrypt$${salt}$${derived}`;
}
export function verifyPassword(password: string, encoded: string): boolean {
  const [algo, salt, derived] = encoded.split("$");
  if (algo !== "scrypt" || !salt || !derived) return false;
  const check = crypto.scryptSync(password, salt, 64).toString("hex");
  return timingSafeEqHex(derived, check);
}
