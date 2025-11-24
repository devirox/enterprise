import ProductsAdminClient from '@/components/dashboard/admin/ProductsAdminClient'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin — Marketplace: Pending Products</h1>
      <ProductsAdminClient />
    </div>
  )
}
