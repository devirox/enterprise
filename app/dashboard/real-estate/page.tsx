import React from 'react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import DashboardLayout from '@/components/layout/DashboardLayout'
import ListingCard from '@/components/dashboard/ListingCard'

type ListingItem = Awaited<ReturnType<typeof prisma.listing.findMany>>[number]

export default async function RealEstateDashboard() {
  const session = await getServerSession(authOptions as any)
  if (!session) return <div>Unauthorized</div>

  const userId = (session as any).user?.id
  try {
    const listings = await prisma.listing.findMany({ where: { realtorId: userId } })
    return (
      <DashboardLayout>
        <h1 className="text-2xl font-bold">Real Estate</h1>

        {listings.length === 0 ? (
          <div className="mt-8 rounded-lg border border-dashed border-slate-200 bg-white/60 p-8 text-center">
            <p className="text-lg font-medium mb-2">No listings yet</p>
            <p className="text-sm text-slate-600 mb-4">You don't have any real-estate listings.</p>
            <a href="/dashboard/real-estate/listings" className="inline-block rounded bg-primary px-4 py-2 text-white">Create a listing</a>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-3 gap-4">
            {listings.map((l: ListingItem) => (
              <ListingCard key={l.id} title={l.title} price={Number(l.price)} />
            ))}
          </div>
        )}

        {/* Dev debug: show session and listing count */}
        {process.env.NODE_ENV !== 'production' && (
          <pre className="mt-4 p-2 text-sm bg-white rounded shadow text-black">
            {JSON.stringify({ session: (session as any), listingsCount: listings.length }, null, 2)}
          </pre>
        )}
      </DashboardLayout>
    )
  } catch (err: any) {
    return (
      <DashboardLayout>
        <h1 className="text-2xl font-bold">Real Estate</h1>
        <div className="text-red-600 mt-4">Error loading listings: {String(err.message || err)}</div>
        {process.env.NODE_ENV !== 'production' && (
          <pre className="mt-4 p-2 text-sm bg-white rounded shadow text-black">{String(err?.stack || err)}</pre>
        )}
      </DashboardLayout>
    )
  }
}
