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

// http://localhost:3000/api/hello?str=안녕 의 결과
// {"id":1,"name":"홍길동","str":"안녕","searchParams":{},"host":"localhost:3000","port":"3000","protocol":"http:","hostname":"localhost","pathname":"/api/hello","basePath":""}