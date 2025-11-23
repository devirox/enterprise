import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { issueToken } from "@/lib/tokens";
import { sendOtpEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const normalizedEmail = String(email ?? "").trim().toLowerCase();
    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (!user || user.emailVerifiedAt) return NextResponse.json({ ok: true });
    const { code } = await issueToken({ userId: user.id, email: user.email, type: "verify_email" });
    const actionUrl = `${process.env.APP_ORIGIN}/verify?email=${encodeURIComponent(user.email)}&code=${encodeURIComponent(code)}&type=verify_email`;
    await sendOtpEmail({
      to: user.email,
      subject: "Your verification code",
      code,
      actionUrl,
      expiresMinutes: Number(process.env.TOKEN_TTL_MINUTES ?? 15),
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
