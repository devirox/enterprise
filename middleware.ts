import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

/**
 * Centralized middleware using next-auth's withAuth helper.
 * Protects /admin/* and /dashboard/* and redirects unauthorized users to /unauthorized.
 */
export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
  const role = String(req.nextauth?.token?.role || '')

    // Compute a safe origin to use when constructing absolute redirect URLs.
    // Prefer the runtime request origin, then the public app origin env, then NEXTAUTH_URL, then localhost.
    const safeOrigin =
      req.nextUrl?.origin ??
      process.env.NEXT_PUBLIC_APP_ORIGIN ??
      process.env.NEXTAUTH_URL ??
      'http://localhost:3000'

    // Allow the top-level dashboard index to render without middleware blocking.
    // The client page at `/dashboard` will perform role-based redirects.
    if (pathname === '/dashboard') return NextResponse.next()

    // Admin area
    try {
      const { hasRole } = require('@/lib/guards')
      if (pathname.startsWith('/dashboard/admin') && !hasRole(role, ['SUPER_ADMIN'])) {
        return NextResponse.redirect(`${safeOrigin}/unauthorized`)
      }

      // Finance staff area
      if (pathname.startsWith('/dashboard/staff/finance') && !hasRole(role, ['SUPER_ADMIN', 'FINANCE_STAFF'])) {
        return NextResponse.redirect(`${safeOrigin}/unauthorized`)
      }

      // Marketplace staff area
      if (pathname.startsWith('/dashboard/staff/marketplace') && !hasRole(role, ['SUPER_ADMIN', 'MARKETPLACE_SELLER'])) {
        return NextResponse.redirect(`${safeOrigin}/unauthorized`)
      }

      // Real-estate staff area
      if (pathname.startsWith('/dashboard/staff/real-estate') && !hasRole(role, ['SUPER_ADMIN', 'REALTOR'])) {
        return NextResponse.redirect(`${safeOrigin}/unauthorized`)
      }
    } catch (err) {
      console.error('guards import error', err)
    }

    // Additional checks (customer-only sections, etc.) can be added here
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
)

export const config = { matcher: ['/admin/:path*', '/dashboard/:path*'] }
