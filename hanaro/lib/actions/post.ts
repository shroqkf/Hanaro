'use server';

import prisma from '@/lib/db';

export async function createPost(
  categoryId: number,
  userId: number,
  title: string,
  content: string
) {
  await prisma.post.create({
    data: {
      title,
      content,
      category_id: categoryId,
      user_id: userId,
    },
  });
}

export async function updatePost(
  postId: number,
  title: string,
  content: string
) {
  await prisma.post.update({
    where: { post_id: postId },
    data: { title, content, editdt: new Date() },
  });
}

export async function getAllPosts() {
  const posts = await prisma.post.findMany({
    include: {
      User: true,
    },
    orderBy: {
      writedt: 'desc',
    },
  });

  return posts.map((post) => ({
    ...post,
    name: post.User?.name || '익명',
  }));
}

export async function getPostsByCategory(categoryId: number) {
  return prisma.post.findMany({
    where: { category_id: categoryId },
    include: { User: true },
    orderBy: { writedt: 'desc' },
  });
}

export async function getPostById(postId: number) {
  return await prisma.post.findUnique({
    where: { post_id: postId },
    include: { User: true },
  });
}

export async function getUserReaction(postId: number, userId: number) {
  const reaction = await prisma.reaction.findFirst({
    where: { post_id: postId, user_id: userId },
  });
  return reaction?.type || null;
}
