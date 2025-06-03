import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const postId = Number(searchParams.get('postId'));
  const userId = Number(searchParams.get('userId'));

  if (!postId || !userId) {
    return NextResponse.json(
      { error: 'Missing postId or userId' },
      { status: 400 }
    );
  }

  const reaction = await prisma.reaction.findFirst({
    where: { post_id: postId, user_id: userId },
    select: { type: true },
  });

  return NextResponse.json({ type: reaction?.type ?? null });
}
