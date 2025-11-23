"use client"

import React, { useState } from 'react'

export default function ResetRequestPage({ searchParams }: { searchParams?: { email?: string } }) {
  const prefill = typeof searchParams === 'object' ? (searchParams?.email ?? '') : ''
  const [email, setEmail] = useState(prefill)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    try {
      const res = await fetch('/api/auth/request-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setMessage('If an account exists we sent a reset code to the email.')
      } else {
        setMessage('Failed to send reset code. Try again later.')
      }
    } catch (err) {
      setMessage('Network error. Try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Reset your password</h1>
      <p className="mt-2">Enter your email to receive a password reset code.</p>
      <form onSubmit={handleSend} className="mt-6 max-w-md">
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          required
          className="mt-1 w-full rounded border border-slate-200 px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="mt-4 w-full rounded bg-blue-600 py-2 text-white" disabled={loading}>
          {loading ? 'Sending...' : 'Send reset code'}
        </button>
        {message ? <div className="mt-4 text-sm text-stone-700">{message}</div> : null}
      </form>
    </main>
  )
}
