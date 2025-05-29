import { NextRequest, NextResponse } from 'next/server';
import { auth } from './lib/auth';

const authenticatedPages = ['/api/folder', '/board', '/hi/night'];

export async function middleware(req: NextRequest) {
  const session = await auth();
  const didLogin = !!session?.user;

  const { pathname } = req.nextUrl;
  console.log('🚀 middleware - pathname:', pathname);

  if (pathname.startsWith('/hello/')) {
    const path = pathname.substring(pathname.lastIndexOf('/'));
    // console.log('🚀 paths:', path);
    return NextResponse.redirect(new URL(`/hi${path}?x=000`, req.url));
  }

  if (!didLogin && authenticatedPages.some((ap) => pathname.startsWith(ap))) {
    const callbackUrl = encodeURIComponent(pathname);
    return NextResponse.redirect(
      new URL(`/auth/signin?callbackUrl=${callbackUrl}`, req.url)
    );
  }

  return NextResponse.next();
}

// export const config = {
//   matcher: ['/hello/:path*', '/api/folders/:path*'],
// };

export const config = {
  matcher: [
    '/((?!login|regist|_next/static|_next/image|auth|favicon.ico|robots.txt|images|api/auth|auth/signin$).*)',
    '/api/:path*',
  ],
};
