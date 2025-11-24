'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type User = { id: string; name?: string | null; email: string; role?: string | null; isApproved?: boolean }

export default function UserViewClient({ id }: { id: string }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetch(`/api/admin/users/${id}`)
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text())
        return r.json()
      })
      .then((d) => setUser(d.user || null))
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false))
  }, [id])

  async function removeUser() {
    if (!confirm('Delete user?')) return
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error(await res.text())
      router.push('/dashboard/admin/users')
    } catch (err: any) {
      setError(err?.message || String(err))
    }
  }

  if (loading) return <div>Loading user…</div>
  if (error) return <div className="text-red-600">Error: {error}</div>
  if (!user) return <div>User not found.</div>

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">{user.email}</h2>
        <div className="text-sm text-muted-foreground">{user.name}</div>
        <div className="text-sm">Role: {user.role}</div>
        <div className="text-sm">Approved: {user.isApproved ? 'Yes' : 'No'}</div>
      </div>
      <div>
        <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={removeUser}>Delete User</button>
      </div>
    </div>
  )
}
