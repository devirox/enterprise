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
    const messages = await (prisma as any).contactMessage.findMany({ orderBy: { createdAt: 'desc' }, take: 500 })
    return NextResponse.json({ messages })
  } catch (err: any) {
    console.error('Contact messages list error', err)
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
    await (prisma as any).contactMessage.delete({ where: { id } })
    await (prisma as any).auditLog.create({ data: { actorId: (session as any).user?.id, action: 'delete_message', resource: 'ContactMessage', resourceId: id, meta: { deletedBy: (session as any).user?.email } } })
    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error('Delete message error', err)
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 })
  }
}
