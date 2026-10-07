import { NextRequest, NextResponse } from 'next/server'
import { legacyRedirects } from '@/config/redirects'
export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname.replace(/\/$/, '') || '/'
  const target =
    pathname === '/posts'
      ? '/insights'
      : pathname.startsWith('/posts/') && !pathname.startsWith('/posts/page/')
        ? pathname.replace('/posts/', '/insights/')
        : legacyRedirects[pathname]
  if (target) {
    const url = request.nextUrl.clone()
    url.pathname = target
    return NextResponse.redirect(url, 301)
  }
  return NextResponse.next()
}
export const config = {
  matcher: [
    '/about-us/:path*',
    '/contact-us/:path*',
    '/portfolio/:path*',
    '/blogs/:path*',
    '/:slug-services',
    '/posts/:path*',
  ],
}
