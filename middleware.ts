import { type NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl
  
  // If there's a code parameter at the root, redirect to /auth/callback with the code
  if (pathname === '/' && searchParams.has('code')) {
    const code = searchParams.get('code')
    const next = searchParams.get('next')
    
    const callbackUrl = new URL('/auth/callback', request.nextUrl)
    callbackUrl.searchParams.set('code', code!)
    if (next) {
      callbackUrl.searchParams.set('next', next)
    }
    
    return NextResponse.redirect(callbackUrl)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/']
}
