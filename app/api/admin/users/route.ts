import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET(req: Request) {
  const session = await getServerSession(authOptions as any)
  if (!session || (session as any).user?.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const url = new URL(req.url)
  const onlyPending = url.searchParams.get('pending') === '1'

  const where: any = {}
  if (onlyPending) where.isApproved = false

  const users = await prisma.user.findMany({ where, orderBy: { createdAt: 'desc' }, take: 200 })

  const payload = users.map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role, isApproved: u.isApproved, createdAt: u.createdAt }))

  return NextResponse.json({ users: payload })
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions as any)
  if (!session || (session as any).user?.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { name, email, role = 'CUSTOMER', password } = body
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

    // create user; hash handled in lib/hash or directly store as hashedPassword if provided
    const created = await (prisma as any).user.create({ data: { name, email, role, isApproved: true, hashedPassword: password ? String(password) : null } })

    await (prisma as any).auditLog.create({ data: { actorId: (session as any).user?.id, action: 'create_user', resource: 'User', resourceId: created.id, meta: { createdEmail: created.email } } })

    return NextResponse.json({ ok: true, user: { id: created.id, email: created.email, name: created.name, role: created.role } })
  } catch (err: any) {
    console.error('Create user error', err)
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 })
  }
}
