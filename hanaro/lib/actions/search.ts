'use server';

import prisma from '@/lib/db';

type SearchResult = {
  post_id: number;
  user_id: number;
  category_id: number;
  title: string;
  content: string | null;
  writedt: string;
  editdt: string | null;
  name: string; // User.name
};

export async function searchPosts(rawQuery: string): Promise<SearchResult[]> {
  return prisma.$queryRawUnsafe<SearchResult[]>(
    `
    SELECT P.post_id, P.user_id, P.category_id, P.title, P.content, P.writedt, P.editdt, U.name
    FROM Post P
    JOIN User U ON P.user_id = U.user_id
    WHERE MATCH(P.title, P.content) AGAINST (? IN NATURAL LANGUAGE MODE)
    `,
    rawQuery
  );
}
