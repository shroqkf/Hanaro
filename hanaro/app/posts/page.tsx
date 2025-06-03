import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts } from '@/lib/actions/post';
import { searchPosts } from '@/lib/actions/search';
import { categories } from '@/constants/categories';

type Props = {
  searchParams?: {
    q?: string;
  };
};

export default async function AllPostsPage({ searchParams }: Props) {
  const keyword = searchParams?.q;
  const posts = keyword ? await searchPosts(keyword) : await getAllPosts();

  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold mb-6'>
        {keyword ? `"${keyword}" 검색 결과` : '전체 게시글 목록'}
      </h1>

      {posts.length === 0 ? (
        <p className='text-gray-500'>검색 결과가 없습니다.</p>
      ) : (
        <ul className='space-y-4'>
          {posts.map((post) => {
            const category = categories.find(
              (cate) => cate.id === post.category_id
            );

            return (
              <li key={post.post_id} className='border-b pb-4'>
                <Link
                  href={`/boards/${post.category_id}/${post.post_id}`}
                  className='flex items-center justify-between gap-2'
                >
                  <h2 className='text-xl font-semibold hover:underline'>
                    {post.title}
                  </h2>
                  {category && (
                    <Image
                      src={category.icon}
                      alt={category.name}
                      width={20}
                      height={20}
                    />
                  )}
                </Link>
                <p className='text-sm text-gray-500'>
                  by {post.name || '익명'} ·&nbsp;
                  {format(new Date(post.writedt), 'yyyy-MM-dd')}
                </p>
                <p className='mt-1 text-gray-700 line-clamp-2'>
                  {post.content}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
