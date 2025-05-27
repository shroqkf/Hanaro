import { NextRequest, NextResponse } from 'next/server';

export function GET(request: NextRequest) {
  const { searchParams, host, port, protocol, hostname, pathname, basePath } =
    request.nextUrl;

  return NextResponse.json({
    id: 1,
    name: '홍길동',
    str: searchParams.get('str'),
    searchParams,
    host,
    port,
    protocol,
    hostname,
    pathname,
    basePath,
  });
}

export function POST() {}
