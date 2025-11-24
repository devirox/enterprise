import React from 'react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import DashboardLayout from '@/components/layout/DashboardLayout'
import ProductCard from '@/components/dashboard/ProductCard'

type ProductItem = Awaited<ReturnType<typeof prisma.product.findMany>>[number]

export default async function MarketplaceDashboard() {
  const session = await getServerSession(authOptions as any)
  if (!session) return <div>Unauthorized</div>

  const userId = (session as any).user?.id
  try {
    const products = await prisma.product.findMany({ where: { sellerId: userId } })
    return (
      <DashboardLayout>
        <h1 className="text-2xl font-bold">Marketplace</h1>

        {products.length === 0 ? (
          <div className="mt-8 rounded-lg border border-dashed border-slate-200 bg-white/60 p-8 text-center">
            <p className="text-lg font-medium mb-2">No products yet</p>
            <p className="text-sm text-slate-600 mb-4">You don't have any products in the marketplace.</p>
            <a href="/dashboard/marketplace/products" className="inline-block rounded bg-primary px-4 py-2 text-white">Create a product</a>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-3 gap-4">
            {products.map((p: ProductItem) => (
              <ProductCard key={p.id} title={p.title} price={Number(p.price)} />
            ))}
          </div>
        )}

        {process.env.NODE_ENV !== 'production' && (
          <pre className="mt-4 p-2 text-sm bg-white rounded shadow text-black">
            {JSON.stringify({ session: (session as any), productsCount: products.length }, null, 2)}
          </pre>
        )}
      </DashboardLayout>
    )
  } catch (err: any) {
    return (
      <DashboardLayout>
        <h1 className="text-2xl font-bold">Marketplace</h1>
        <div className="text-red-600 mt-4">Error loading products: {String(err.message || err)}</div>
        {process.env.NODE_ENV !== 'production' && (
          <pre className="mt-4 p-2 text-sm bg-white rounded shadow text-black">{String(err?.stack || err)}</pre>
        )}
      </DashboardLayout>
    )
  }
}
