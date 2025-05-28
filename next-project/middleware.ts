import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log('🚀 middleware - pathname:', pathname);
  if (pathname.startsWith('/hello/')) {
    const path = pathname.substring(pathname.lastIndexOf('/'));
    // console.log('🚀 paths:', path);
    return NextResponse.redirect(new URL(`/hi${path}?x=000`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/hello/:path*', '/api/folders/:path*'],
};

// export const config = {
//   matcher: [
// '/((?!login|regist|_next/static|_next/image|auth|favicon.ico|robots.txt|images|$).*)',
//     '/api/:path*',
//   ],
// };
