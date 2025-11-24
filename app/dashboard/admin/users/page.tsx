import UsersAdminClient from '@/components/dashboard/admin/UsersAdminClient'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin — Users</h1>
      <UsersAdminClient />
    </div>
  )
}
