import AuditLogsClient from '@/components/dashboard/admin/AuditLogsClient'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin — Audit Logs</h1>
      <AuditLogsClient />
    </div>
  )
}
