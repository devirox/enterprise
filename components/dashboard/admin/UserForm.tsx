'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function UserForm() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('CUSTOMER')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      const res = await fetch('/api/admin/users', { method: 'POST', body: JSON.stringify({ email, name, role, password }), headers: { 'Content-Type': 'application/json' } })
      if (!res.ok) throw new Error(await res.text())
      await res.json()
      router.push('/dashboard/admin/users')
    } catch (err: any) {
      setError(err?.message || String(err))
    }
  }

  return (
    <form onSubmit={submit} className="max-w-md space-y-4">
      {error && <div className="text-red-600">{error}</div>}
      <div>
        <label className="block text-sm">Email</label>
        <input aria-label="Email" placeholder="user@example.com" className="w-full border p-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm">Name</label>
        <input aria-label="Name" placeholder="Full name" className="w-full border p-2" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm">Role</label>
        <select aria-label="Role" className="w-full border p-2" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="SUPER_ADMIN">SUPER_ADMIN</option>
          <option value="FINANCE_STAFF">FINANCE_STAFF</option>
          <option value="MARKETPLACE_SELLER">MARKETPLACE_SELLER</option>
          <option value="REALTOR">REALTOR</option>
          <option value="CUSTOMER">CUSTOMER</option>
        </select>
      </div>
      <div>
        <label className="block text-sm">Password (optional)</label>
        <input aria-label="Password" placeholder="Set a password (optional)" type="password" className="w-full border p-2" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Create User</button>
      </div>
    </form>
  )
}
