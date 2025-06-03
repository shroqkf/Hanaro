import { notFound } from 'next/navigation';
import { getPostsByCategory } from '@/lib/actions/post';
import { categories } from '@/constants/categories';

export default async function BoardDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const category = categories.find((cate) => cate.id === Number(params.id));
  if (!category) return notFound();

  const categoryName = category.name;

  const posts = await getPostsByCategory(Number(params.id));

  return (
    <div className='p-8'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>{categoryName} 게시판</h1>
      </div>

      <ul className='space-y-4'>
        {posts.map((post) => (
          <li key={post.post_id} className='border p-4 rounded'>
            <h2 className='text-lg font-semibold'>{post.title}</h2>

            <p className='text-gray-600 text-sm mt-2 line-clamp-2'>
              {post.content?.split('\n')[0]}
            </p>

            <section className='flex justify-between mt-4'>
              <a
                href={`/boards/${post.category_id}/${post.post_id}`}
                className='text-sm text-left text-blue-500'
              >
                자세히 보기 ↗️
              </a>
              <p className='text-sm text-right text-gray-400'>
                작성자: {post.User.name}
              </p>
            </section>
          </li>
        ))}
      </ul>
    </div>
  );
}
