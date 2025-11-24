'use client'

import React, { useEffect, useState } from 'react'
import AdminDbMissing from './AdminDbMissing'

type Flag = { id: string; key: string; description?: string; isActive: boolean; value?: any }

export default function FeatureFlagsClient() {
  const [flags, setFlags] = useState<Flag[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/feature-flags')
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text())
        return r.json()
      })
      .then((data) => setFlags(data.flags || []))
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false))
  }, [])

  async function toggleFlag(id: string, current: boolean) {
    try {
      const flag = flags.find((f) => f.id === id)
      if (!flag) return
      const body = { key: flag.key, description: flag.description, isActive: !current, value: flag.value }
      const res = await fetch('/api/admin/feature-flags', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } })
      if (!res.ok) throw new Error(await res.text())
      const json = await res.json()
      setFlags((prev) => prev.map((f) => (f.id === id ? json.flag : f)))
    } catch (err: any) {
      setError(err?.message || String(err))
    }
  }

  if (loading) return <div>Loading feature flags…</div>
  if (error) {
    const lower = String(error).toLowerCase()
    const isMissing = /does not exist|no such table|relation .* does not exist|table .* does not exist/.test(lower)
    if (isMissing) return <AdminDbMissing error={error} />
    return <div className="text-red-600">Error: {error}</div>
  }

  return (
    <div className="space-y-4">
      {flags.map((f) => (
        <div key={f.id} className="flex items-center justify-between p-3 border rounded">
          <div>
            <div className="font-medium">{f.key}</div>
            {f.description && <div className="text-sm text-muted-foreground">{f.description}</div>}
          </div>
          <div>
            <button className={`px-3 py-1 rounded ${f.isActive ? 'bg-green-600 text-white' : 'bg-gray-200'}`} onClick={() => toggleFlag(f.id, f.isActive)}>
              {f.isActive ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
