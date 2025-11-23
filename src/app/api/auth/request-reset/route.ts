import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { issueToken } from "@/lib/tokens";
import { sendOtpEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const normalizedEmail = String(email ?? "").trim().toLowerCase();
    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (user) {
      const { code } = await issueToken({ userId: user.id, email: user.email, type: "reset_password" });
      const actionUrl = `${process.env.APP_ORIGIN}/reset?email=${encodeURIComponent(user.email)}&type=reset_password`;
      await sendOtpEmail({
        to: user.email,
        subject: "Your password reset code",
        code,
        actionUrl,
        expiresMinutes: Number(process.env.TOKEN_TTL_MINUTES ?? 15),
      });
      if (process.env.NODE_ENV !== 'production') {
        return NextResponse.json({ ok: true, code });
      }
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
