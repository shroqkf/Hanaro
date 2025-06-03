import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/db';

export async function GET() {
  const session = await auth();

  if (!session?.user?.is_admin) {
    return NextResponse.json({ message: '권한이 없습니다.' }, { status: 403 });
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        user_id: true,
        name: true,
        email: true,
        is_admin: true,
      },
      orderBy: { user_id: 'asc' },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('회원 조회 오류:', error);
    return NextResponse.json({ message: '서버 오류' }, { status: 500 });
  }
}

