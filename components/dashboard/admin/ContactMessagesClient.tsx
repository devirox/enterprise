'use client'

import React, { useEffect, useState } from 'react'
import AdminDbMissing from './AdminDbMissing'

type Msg = { id: string; name?: string; email: string; message: string; createdAt?: string }

export default function ContactMessagesClient() {
  const [messages, setMessages] = useState<Msg[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/contact-messages')
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text())
        return r.json()
      })
      .then((d) => setMessages(d.messages || []))
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false))
  }, [])

  async function removeMsg(id: string) {
    if (!confirm('Delete message?')) return
    try {
      const res = await fetch(`/api/admin/contact-messages/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error(await res.text())
      setMessages((prev) => prev.filter((m) => m.id !== id))
    } catch (err: any) {
      setError(err?.message || String(err))
    }
  }

  if (loading) return <div>Loading messages…</div>
  if (error) {
    const lower = String(error).toLowerCase()
    const isMissing = /does not exist|no such table|relation .* does not exist|table .* does not exist/.test(lower)
    if (isMissing) return <AdminDbMissing error={error} />
    return <div className="text-red-600">Error: {error}</div>
  }
  if (!messages.length) return <div>No contact messages.</div>

  return (

    <table className="w-full table-auto border">
      <thead>
        <tr >
          <th className="p-2 text-left">Name</th>
          <th className="p-2 text-left">Email</th>
          <th className="p-2 text-left">Message</th>
          <th className="p-2 text-left">Received At</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {messages.map((m) => (
          <tr key={m.id} className="border-t">
            <td className="p-2">{m.name || '—'}</td>
            <td className="p-2">{m.email}</td>
            <td className="p-2">{m.message}</td>
            <td className="p-2">{new Date(m.createdAt || '').toLocaleString()}</td>
            <td className="p-2">
              <button className="px-2 py-1 bg-red-600 text-white rounded" onClick={() => removeMsg(m.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
  //   <div className="space-y-3">
  //     {messages.map((m) => (
  //       <div key={m.id} className="border p-3 rounded">
  //         <div className="flex justify-between">
  //           <div>
  //             <div className="font-medium">{m.name ?? m.email}</div>
  //             <div className="text-sm text-muted-foreground">{m.email}</div>
  //           </div>
  //           <div className="text-xs text-muted-foreground">{new Date(m.createdAt || '').toLocaleString()}</div>
  //         </div>
  //         <div className="mt-2">{m.message}</div>
  //         <div className="mt-2">
  //           <button className="px-2 py-1 bg-red-600 text-white rounded" onClick={() => removeMsg(m.id)}>Delete</button>
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // )
}
