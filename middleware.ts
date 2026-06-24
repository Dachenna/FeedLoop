import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll() {
          // no-op in middleware
        },
      },
    }
  )

  // Get JWT claims for the current session
  const { data } = await supabase.auth.getClaims()
  const claims: any = data?.claims

  // If no session, redirect to login
  if (!claims || !claims.sub) {
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  const userId = claims.sub

  // Determine role: prefer claim, fallback to DB lookup
  let role = claims.role as string | undefined
  if (!role) {
    const { data: tm } = await supabase
      .from('team_members')
      .select('role')
      .eq('user_id', userId)
      .limit(1)
      .maybeSingle()

    role = (tm as any)?.role
  }

  const path = request.nextUrl.pathname

  // Admin-only paths - adjust as needed
  const adminOnly = ['/team']
  if (adminOnly.some((p) => path.startsWith(p))) {
    if (!role || (role !== 'admin' && role !== 'owner')) {
      url.pathname = '/auth/login'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard',
    '/surveys/:path*',
    '/responses/:path*',
    '/settings/:path*',
    '/team/:path*',
    '/survey/:path*',
    '/api/:path*',
  ],
}
