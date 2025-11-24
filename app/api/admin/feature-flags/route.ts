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
    const flags = await (prisma as any).featureFlag.findMany({ orderBy: { key: 'asc' } })
    return NextResponse.json({ flags })
  } catch (err: any) {
    console.error('Feature flags list error', err)
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions as any)
  if (!session || (session as any).user?.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { key, description, isActive = false, value = null } = body
    if (!key) return NextResponse.json({ error: 'Missing key' }, { status: 400 })

    const flag = await (prisma as any).featureFlag.upsert({
      where: { key },
      update: { description, isActive, value },
      create: { key, description, isActive, value, createdById: (session as any).user?.id },
    })
    return NextResponse.json({ ok: true, flag })
  } catch (err: any) {
    console.error('Feature flags create/update error', err)
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 })
  }
}
