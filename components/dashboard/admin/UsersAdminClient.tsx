'use client'

import React, { useEffect, useState } from 'react'

type User = {
  id: string
  email?: string | null
  name?: string | null
  role?: string | null
  isApproved?: boolean
  createdAt?: string
}

export default function UsersAdminClient() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch('/api/admin/users?pending=1')
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text())
        return res.json()
      })
      .then((data) => {
        setUsers(data.users || [])
      })
      .catch((err) => setError(err?.message || String(err)))
      .finally(() => setLoading(false))
  }, [])

  async function approveUser(id: string) {
    setError(null)
    try {
      const res = await fetch(`/api/admin/users/${id}/approve`, { method: 'POST' })
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || 'Approve failed')
      }
      // remove from list
      setUsers((prev) => prev.filter((u) => u.id !== id))
    } catch (err: any) {
      setError(err?.message || String(err))
    }
  }

  if (loading) return <div>Loading users…</div>
  if (error) return <div className="text-red-600">Error: {error}</div>
  if (!users.length) return <div>No pending users found.</div>

  return (
    <div className="space-y-4">
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Role</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="p-2">{u.email ?? '—'}</td>
              <td className="p-2">{u.name ?? '—'}</td>
              <td className="p-2">{u.role ?? '—'}</td>
              <td className="p-2">
                <button
                  className="px-3 py-1 bg-green-600 text-white rounded"
                  onClick={() => approveUser(u.id)}
                >
                  Approve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
