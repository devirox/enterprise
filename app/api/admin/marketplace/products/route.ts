import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET(req: Request) {
  const session = await getServerSession(authOptions as any)
  if (!session || (session as any).user?.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const products = await (prisma as any).product.findMany({ where: { isApproved: false }, orderBy: { createdAt: 'desc' }, take: 200 })
    return NextResponse.json({ products })
  } catch (err: any) {
    console.error('Admin products list error', err)
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 })
  }
}
