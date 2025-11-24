'use client'

import React, { useEffect, useState } from 'react'
import AdminDbMissing from './AdminDbMissing'

type AuditLog = {
  id: string
  actorId?: string | null
  action: string
  resource: string
  resourceId?: string | null
  meta?: any
  createdAt?: string
}

export default function AuditLogsClient() {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/audit-logs')
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text())
        return res.json()
      })
      .then((data) => setLogs(data.logs || []))
      .catch((err) => setError(err?.message || String(err)))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading audit logs…</div>
  if (error) {
    const lower = String(error).toLowerCase()
    const isMissing = /does not exist|no such table|relation .* does not exist|table .* does not exist/.test(lower)
    if (isMissing) return <AdminDbMissing error={error} />
    return <div className="text-red-600">Error: {error}</div>
  }
  if (!logs.length) return <div>No audit logs found.</div>

  return (
    <div className="space-y-4">
      <ul className="list-disc ml-5">
        {logs.map((l) => (
          <li key={l.id} className="mb-2">
            <div className="text-sm text-gray-600">{new Date(l.createdAt || '').toLocaleString()}</div>
            <div>
              <strong>{l.action}</strong> — {l.resource} {l.resourceId ? `(${l.resourceId})` : ''}
            </div>
            {l.meta && <pre className="text-xs bg-gray-100 p-2 rounded mt-1">{JSON.stringify(l.meta, null, 2)}</pre>}
          </li>
        ))}
      </ul>
    </div>
  )
}
