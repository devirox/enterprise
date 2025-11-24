import UserViewClient from '@/components/dashboard/admin/UserViewClient'

export const dynamic = 'force-dynamic'

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">View User</h1>
      <UserViewClient id={params.id} />
    </div>
  )
}
