import Link from 'next/link';
import { getPostsByCategory } from '@/lib/actions/post';

type Props = {
  categoryId: number;
};

export default async function BoardPreview({ categoryId }: Props) {
  const posts = await getPostsByCategory(categoryId);

  const previewPosts = posts.slice(0, 3);

  return (
    <ul className='mt-4 space-y-2 text-sm text-gray-700'>
      {previewPosts.map((post) => (
        <li key={post.post_id} className='line-clamp-1'>
          <Link
            href={`/boards/${categoryId}/${post.post_id}`}
            className='hover:underline hover:text-green-700 text-gray-600'
          >
            • {post.title}
          </Link>
        </li>
      ))}
      {posts.length === 0 && <li className='text-gray-400'>게시글 없음</li>}
      <br />
      <li>...</li>
    </ul>
  );
}
