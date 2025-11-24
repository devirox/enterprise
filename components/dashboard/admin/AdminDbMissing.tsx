'use client'

import React from 'react'

export default function AdminDbMissing({ error }: { error?: string }) {
  const message = error || 'Required admin tables are not present in the database.'

  return (
    <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded">
      <h3 className="font-semibold">Admin data unavailable</h3>
      <p className="mt-2 text-sm">{message}</p>
      <div className="mt-3 text-sm">
        <p>Please run the database migrations to create the missing tables and regenerate the Prisma client.</p>
        <pre className="mt-2 p-2 bg-slate-800 text-white rounded text-xs">
          <code>
            npx prisma migrate dev --name init_admin
          </code>
        </pre>
        <pre className="mt-2 p-2 bg-slate-800 text-white rounded text-xs">
          <code>
            npx prisma generate
          </code>
        </pre>
        <p className="mt-2 text-xs text-muted-foreground">Run these commands in your project root (PowerShell/Terminal). On Windows you may need to run an elevated shell if file permission errors occur.</p>
      </div>
    </div>
  )
}
