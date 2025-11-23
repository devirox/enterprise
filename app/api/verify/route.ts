import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/tokens";

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();
    const normalizedEmail = String(email ?? "").trim().toLowerCase();
    await verifyToken({ email: normalizedEmail, type: "verify_email", code: String(code ?? "") });
    await prisma.user.update({
      where: { email: normalizedEmail },
      data: { emailVerifiedAt: new Date() },
    });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "Invalid code" }, { status: 400 });
  }
}
