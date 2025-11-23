import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Basic validation
    if (!email || typeof email !== 'string' || !email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 })
    }
    if (!message || typeof message !== 'string' || message.length < 10) {
      return NextResponse.json({ error: 'Message must be at least 10 characters.' }, { status: 400 })
    }
    if (name && typeof name !== 'string') {
      return NextResponse.json({ error: 'Name must be a string.' }, { status: 400 })
    }

    // Use a typed-any access because Prisma Client type may be out-of-sync
    const record = await (prisma as any).contactMessage.create({
      data: { name: name ?? null, email, message },
    })

    return NextResponse.json({ success: true, id: record.id })
  } catch (err: any) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 })
  }
}
