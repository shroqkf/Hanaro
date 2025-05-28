import { cookies, headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const nextCookies = await cookies();
  console.log('🚀 GET reqCookies:', nextCookies);
  const sid = nextCookies.get('sid');
  console.log('🚀 GET sid:', sid);
  const reqHeaders = new Headers(request.headers);
  console.log('🚀 GET reqHeaders:', reqHeaders);
  const nextHeaders = await headers();
  console.log('🚀 GET nextHeaders:', nextHeaders);
  const userAgent = nextHeaders.get('User-Agent');
  console.log('🚀 GET userAgent:', userAgent);
  const res = NextResponse.json(
    { id: 1 },
    {
      headers: { 'Custom-Cookie': userAgent!, 'Set-Cookie': 'sid=123' },
    }
  );
  // 2025-05-28T06:37:23.469Z
  res.cookies.set('x', '123');
  res.cookies.set('y', '456');

  const dbPasswd = process.env.DB_PASSWD;
  console.log('🚀 GET dbPasswd:', dbPasswd);
  const { DEV_X } = process.env;
  console.log('🚀 GET DEV_X:', DEV_X);

  const expireDate = new Date();
  expireDate.setTime(expireDate.getTime() + 24 * 60 * 60 * 1000);
  res.cookies.set('otherCookies', 'oo', {
    maxAge: 24 * 60 * 60, // 86400
    httpOnly: true,
    path: '/',
    secure: false,
    expires: expireDate,
  });
  return res;
}
