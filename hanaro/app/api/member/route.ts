import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/db';

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { name: true, email: true },
  });

  return NextResponse.json(user);
}

export async function PATCH(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: '인증되지 않았습니다.' },
      { status: 401 }
    );
  }

  const userId = Number(session.user.id);
  const { name, email } = await req.json();

  try {
    const updated = await prisma.user.update({
      where: { user_id: userId },
      data: {
        ...(name && { name }),
        ...(email && { email }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('프로필 수정 오류:', error);
    return NextResponse.json({ message: '서버 오류' }, { status: 500 });
  }
}

export async function DELETE() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: '인증되지 않았습니다.' },
      { status: 401 }
    );
  }

  try {
    await prisma.user.delete({
      where: { user_id: Number(session.user.id) },
    });

    return NextResponse.json({ message: '회원 탈퇴 완료' });
  } catch (error) {
    console.error('회원 탈퇴 오류:', error);
    return NextResponse.json({ message: '서버 오류' }, { status: 500 });
  }
}
