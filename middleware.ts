import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has('user')
  const isAuthRoute = ['/login', '/signup'].includes(request.nextUrl.pathname)
  const isRootPath = request.nextUrl.pathname === '/'

  // Always redirect root path to login
  if (isRootPath) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If user is authenticated and trying to access auth routes
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/login', '/signup']
} 