import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const userCookie = request.cookies.get('user')
  
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!userCookie) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      const userData = JSON.parse(userCookie.value)
      if (userData.role !== 'admin') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    } catch {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
} 