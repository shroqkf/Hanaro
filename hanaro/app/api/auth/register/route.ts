import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!email || !password || !name) {
    return NextResponse.json(
      { error: '모든 항목을 입력해주세요.' },
      { status: 400 }
    );
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: '이미 존재하는 이메일입니다.' },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, is_admin: false },
  });

  return NextResponse.json({ message: '회원가입 성공', user });
}
