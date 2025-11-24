import ListingsAdminClient from '@/components/dashboard/admin/ListingsAdminClient'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin — Real Estate: Pending Listings</h1>
      <ListingsAdminClient />
    </div>
  )
}
