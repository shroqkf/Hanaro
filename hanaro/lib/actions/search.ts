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
  name: string;
};

export async function searchPosts(rawQuery: string): Promise<SearchResult[]> {
  // Fulltext 검색
  return prisma.$queryRawUnsafe<SearchResult[]>(
    `
    SELECT P.*
    FROM Post P
    WHERE MATCH(P.title, P.content)
    AGAINST (? IN NATURAL LANGUAGE MODE)
    `,
    rawQuery
  );
}
