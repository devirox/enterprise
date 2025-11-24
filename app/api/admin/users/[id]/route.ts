import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET(req: Request, context: any) {
  const session = await getServerSession(authOptions as any)
  if (!session || (session as any).user?.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const params = context?.params ? await context.params : {}
  const id = params?.id
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

  try {
    const user = await (prisma as any).user.findUnique({ where: { id } })
    if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role, isApproved: user.isApproved, createdAt: user.createdAt } })
  } catch (err: any) {
    console.error('Get user error', err)
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 })
  }
}

export async function DELETE(req: Request, context: any) {
  const session = await getServerSession(authOptions as any)
  if (!session || (session as any).user?.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const params = context?.params ? await context.params : {}
  const id = params?.id
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

  try {
    await (prisma as any).user.delete({ where: { id } })
    await (prisma as any).auditLog.create({ data: { actorId: (session as any).user?.id, action: 'delete_user', resource: 'User', resourceId: id, meta: { deletedBy: (session as any).user?.email } } })
    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error('Delete user error', err)
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 })
  }
}
