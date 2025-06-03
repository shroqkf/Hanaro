import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { user_id, post_id, type } = body;

  if (!user_id || !post_id || !type) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const existing = await prisma.reaction.findFirst({
    where: {
      user_id,
      post_id,
    },
  });

  if (existing) {
    if (existing.type === type) {
      await prisma.reaction.delete({
        where: { reaction_id: existing.reaction_id },
      });
    } else {
      await prisma.reaction.update({
        where: { reaction_id: existing.reaction_id },
        data: { type },
      });
    }
  } else {
    await prisma.reaction.create({
      data: {
        user_id,
        post_id,
        type,
      },
    });
  }

  return NextResponse.json({ success: true });
}
