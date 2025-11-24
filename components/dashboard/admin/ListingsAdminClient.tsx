'use client'

import React, { useEffect, useState } from 'react'
import AdminDbMissing from './AdminDbMissing'

type Listing = { id: string; title: string; description?: string; price?: string }

export default function ListingsAdminClient() {
  const [items, setItems] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/real-estate/listings')
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text())
        return r.json()
      })
      .then((d) => setItems(d.listings || []))
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false))
  }, [])

  async function approve(id: string) {
    try {
      const res = await fetch(`/api/admin/real-estate/listings/${id}/approve`, { method: 'POST' })
      if (!res.ok) throw new Error(await res.text())
      setItems((prev) => prev.filter((p) => p.id !== id))
    } catch (err: any) {
      setError(err?.message || String(err))
    }
  }

  if (loading) return <div>Loading listings…</div>
  if (error) {
    const lower = String(error).toLowerCase()
    const isMissing = /does not exist|no such table|relation .* does not exist|table .* does not exist/.test(lower)
    if (isMissing) return <AdminDbMissing error={error} />
    return <div className="text-red-600">Error: {error}</div>
  }
  if (!items.length) return <div>No pending listings.</div>

  return (
    <div className="space-y-3">
      {items.map((p) => (
        <div key={p.id} className="flex items-center justify-between border p-3 rounded">
          <div>
            <div className="font-medium">{p.title}</div>
            <div className="text-sm text-muted-foreground">{p.description}</div>
          </div>
          <div>
            <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={() => approve(p.id)}>Approve</button>
          </div>
        </div>
      ))}
    </div>
  )
}
