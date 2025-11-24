import ContactMessagesClient from '@/components/dashboard/admin/ContactMessagesClient'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin — Contact Messages</h1>
      <ContactMessagesClient />
    </div>
  )
}
