import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions as any)
  if (!session || (session as any).user?.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // prisma client may not have generated types in the current environment during build,
    // cast to any to avoid type errors and allow build to proceed.
    const logs = await (prisma as any).auditLog.findMany({ orderBy: { createdAt: 'desc' }, take: 200 })
    return NextResponse.json({ logs })
  } catch (err: any) {
    console.error('Audit logs error', err)
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 })
  }
}
