import { prisma } from "@/lib/prisma";
import { addMinutes, isAfter } from "date-fns";
import { generateCode, generateSalt, hashCode, timingSafeEqHex } from "@/lib/crypto";

const TTL_MIN = Number(process.env.TOKEN_TTL_MINUTES ?? 15);
const RESEND_COOLDOWN = Number(process.env.RESEND_COOLDOWN_SECONDS ?? 60);
const MAX_ATTEMPTS = Number(process.env.MAX_TOKEN_ATTEMPTS ?? 5);
export type TokenType = "verify_email" | "reset_password";

export async function issueToken(params: {
  userId: string;
  email: string;
  type: TokenType;
  length?: number;
}) {
  const now = new Date();
  const last = await prisma.verificationToken.findFirst({
    where: { userId: params.userId, type: params.type as any, consumedAt: null },
    orderBy: { createdAt: "desc" },
  });
  if (last && last.createdAt && (now.getTime() - last.createdAt.getTime()) / 1000 < RESEND_COOLDOWN) {
    throw new Error("Please wait before requesting another code.");
  }
  if (last) {
    await prisma.verificationToken.update({
      where: { id: last.id },
      data: { consumedAt: new Date() },
    });
  }
  const code = generateCode(params.length ?? 6);
  const salt = generateSalt();
  const codeHash = hashCode(code, salt);
  const expiresAt = addMinutes(now, TTL_MIN);
  const token = await prisma.verificationToken.create({
    data: {
      userId: params.userId,
      type: params.type as any,
      sentTo: params.email,
      codeHash,
      salt,
      expiresAt,
    },
  });
  return { code, token };
}

export async function verifyToken(params: {
  email: string;
  type: TokenType;
  code: string;
}) {
  const token = await prisma.verificationToken.findFirst({
    where: { sentTo: params.email, type: params.type as any, consumedAt: null },
    orderBy: { createdAt: "desc" },
  });
  if (!token) throw new Error("Invalid or expired code.");
  const now = new Date();
  if (isAfter(now, token.expiresAt!)) {
    await prisma.verificationToken.update({ where: { id: token.id }, data: { consumedAt: now } });
    throw new Error("Code expired.");
  }
  if ((token.attempts ?? 0) >= MAX_ATTEMPTS) throw new Error("Too many attempts.");
  // Normalize code: remove spaces and non-digit characters for robust OTP input.
  const normalized = params.code.replace(/\D/g, "").trim();
  const actual = hashCode(normalized, token.salt!);
  const ok = timingSafeEqHex(token.codeHash!, actual);
  // Dev-only debug logging to help diagnose verification mismatches.
  if (process.env.NODE_ENV !== 'production') {
    try {
      // Avoid logging the full secret in production; this block only runs in dev.
      // Log token metadata and a comparison summary.
      console.debug('[VERIFY DEBUG] email=', params.email);
      console.debug('[VERIFY DEBUG] provided=', JSON.stringify({ raw: params.code, normalized }));
      console.debug('[VERIFY DEBUG] token.id=', token.id, 'createdAt=', token.createdAt?.toISOString());
      console.debug('[VERIFY DEBUG] token.expiresAt=', token.expiresAt?.toISOString(), 'attempts=', token.attempts);
      console.debug('[VERIFY DEBUG] token.salt=', token.salt);
      console.debug('[VERIFY DEBUG] token.codeHash=', token.codeHash?.slice(0, 16) + '...');
      console.debug('[VERIFY DEBUG] computedHash=', actual.slice(0, 16) + '...', 'match=', ok);
    } catch (e) {
      // ignore logging errors
    }
  }
  if (!ok) {
    await prisma.verificationToken.update({
      where: { id: token.id },
      data: { attempts: { increment: 1 } },
    });
    throw new Error("Incorrect code.");
  }
  await prisma.verificationToken.update({
    where: { id: token.id },
    data: { consumedAt: now },
  });
  return { token };
}
