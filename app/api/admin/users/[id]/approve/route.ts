import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function POST(req: any, context: any) {
  const session = await getServerSession(authOptions as any)
  if (!session || (session as any).user?.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Next.js may provide params as an object or a Promise depending on environment.
  const params = context?.params ? await context.params : {}
  const id = params?.id
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  }

  try {
    const updated = await prisma.user.update({ where: { id }, data: { isApproved: true } })

    // Create audit log (cast to any in case Prisma client types are not regenerated yet)
    await (prisma as any).auditLog.create({
      data: {
        actorId: (session as any).user?.id,
        action: 'approve_user',
        resource: 'User',
        resourceId: id,
        meta: { approvedBy: (session as any).user?.email },
      },
    })

    return NextResponse.json({ ok: true, user: { id: updated.id, email: updated.email, isApproved: updated.isApproved } })
  } catch (err: any) {
    console.error('Approve user error', err)
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 })
  }
}
