import createMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'
import { NextRequest } from 'next/server'

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api')) {
    return
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: [
    '/',
    '/(en|tr)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
}
