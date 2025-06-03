import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const postId = Number(searchParams.get('postId'));

  if (!postId) {
    return NextResponse.json({ error: 'postId 찾을 수 없음' }, { status: 400 });
  }

  const likes = await prisma.reaction.count({
    where: { post_id: postId, type: 'like' },
  });

  const dislikes = await prisma.reaction.count({
    where: { post_id: postId, type: 'dislike' },
  });

  return NextResponse.json({ likes, dislikes });
}
