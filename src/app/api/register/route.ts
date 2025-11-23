import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/hash";
import { issueToken } from "@/lib/tokens";
import { sendOtpEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    if (typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json({ error: "Invalid input." }, { status: 400 });
    }
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedName = typeof name === 'string' && name.trim() ? name.trim() : null;
    const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existing) return NextResponse.json({ error: "Email already registered." }, { status: 409 });

    const hashed = await hashPassword(password)
    const user = await prisma.user.create({
      data: { email: normalizedEmail, name: normalizedName, hashedPassword: hashed },
    });
    const { code } = await issueToken({ userId: user.id, email: user.email, type: "verify_email" });
    const actionUrl = `${process.env.APP_ORIGIN}/verify?email=${encodeURIComponent(user.email)}&code=${encodeURIComponent(code)}&type=verify_email`;
    await sendOtpEmail({
      to: user.email,
      subject: "Verify your email",
      code,
      actionUrl,
      expiresMinutes: Number(process.env.TOKEN_TTL_MINUTES ?? 15),
    });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "Server error" }, { status: 400 });
  }
}
