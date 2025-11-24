import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function POST(req: any, context: any) {
  const session = await getServerSession(authOptions as any)
  if (!session || (session as any).user?.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const params = context?.params ? await context.params : {}
  const id = params?.id
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

  try {
    const updated = await (prisma as any).listing.update({ where: { id }, data: { isApproved: true } })
    await (prisma as any).auditLog.create({ data: { actorId: (session as any).user?.id, action: 'approve_listing', resource: 'Listing', resourceId: id, meta: { approvedBy: (session as any).user?.email } } })
    return NextResponse.json({ ok: true, listing: { id: updated.id, title: updated.title, isApproved: updated.isApproved } })
  } catch (err: any) {
    console.error('Approve listing error', err)
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 })
  }
}
