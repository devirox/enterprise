import prisma from '@/lib/prisma'

export default async function ContactMessagesPage() {
  // Use any-cast for Prisma client type mismatch workaround
  const messages = await (prisma as any).contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  })

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Contact Messages</h1>
      <table className="min-w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Message</th>
            <th className="border px-2 py-1">Created At</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg: any) => (
            <tr key={msg.id}>
              <td className="border px-2 py-1">{msg.name || '-'}</td>
              <td className="border px-2 py-1">{msg.email}</td>
              <td className="border px-2 py-1 max-w-xs break-words">{msg.message}</td>
              <td className="border px-2 py-1">{new Date(msg.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
