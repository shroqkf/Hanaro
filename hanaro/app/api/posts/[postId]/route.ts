import { NextRequest, NextResponse } from 'next/server';
import { getPostById } from '@/lib/actions/post';
import prisma from '@/lib/db';

export async function GET(
  _req: Request,
  { params }: { params: { postId: string } }
) {
  const post = await getPostById(Number(params.postId));
  return NextResponse.json(post);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const formData = await req.formData();
  const method = formData.get('_method');

  if (method !== 'DELETE') {
    return NextResponse.json({ message: 'Invalid method' }, { status: 400 });
  }

  const postId = Number(params.postId);
  try {
    await prisma.post.delete({ where: { post_id: postId } });
    return NextResponse.redirect(new URL('/posts', req.url));
  } catch (error) {
    return NextResponse.json({ message: '삭제 실패', error }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const postId = Number(params.postId);
  const { title, content } = await req.json();

  try {
    await prisma.post.update({
      where: { post_id: postId },
      data: { title, content, editdt: new Date() },
    });
    return NextResponse.json({ message: '수정 성공' });
  } catch (error) {
    return NextResponse.json({ message: '수정 실패', error }, { status: 500 });
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { postId: string } }
) {
  const postId = Number(params.postId);

  try {
    await prisma.post.delete({
      where: { post_id: postId },
    });
    return NextResponse.json({ message: '삭제 성공' });
  } catch (error) {
    console.error('게시글 삭제 실패:', error);
    return NextResponse.json({ message: '삭제 실패', error }, { status: 500 });
  }
}
