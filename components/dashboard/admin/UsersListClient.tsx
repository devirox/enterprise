'use client'

import React, { useEffect, useState } from 'react'
import AdminDbMissing from './AdminDbMissing'
import Link from 'next/link'

type User = { id: string; name?: string | null; email: string; role?: string | null; isApproved?: boolean }

export default function UsersListClient() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/users')
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text())
        return r.json()
      })
      .then((d) => setUsers(d.users || []))
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false))
  }, [])

  async function removeUser(id: string) {
    if (!confirm('Delete user?')) return
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error(await res.text())
      setUsers((prev) => prev.filter((u) => u.id !== id))
    } catch (err: any) {
      setError(err?.message || String(err))
    }
  }

  if (loading) return <div>Loading users…</div>
  if (error) {
    const lower = String(error).toLowerCase()
    const isMissing = /does not exist|no such table|relation .* does not exist|table .* does not exist/.test(lower)
    if (isMissing) return <AdminDbMissing error={error} />
    return <div className="text-red-600">Error: {error}</div>
  }
  if (!users.length) return <div>No users found.</div>

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">All Users</h2>
        <Link href="/dashboard/admin/users/add" className="px-3 py-1 bg-blue-600 text-white rounded">Add User</Link>
      </div>
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
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.name ?? '—'}</td>
              <td className="p-2">{u.role ?? '—'}</td>
              <td className="p-2 space-x-2">
                <Link href={`/dashboard/admin/users/view/${u.id}`} className="px-2 py-1 bg-gray-200 rounded">View</Link>
                <button className="px-2 py-1 bg-red-600 text-white rounded" onClick={() => removeUser(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
