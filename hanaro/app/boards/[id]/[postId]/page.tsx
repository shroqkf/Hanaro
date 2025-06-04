import { format } from 'date-fns';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostById, getUserReaction } from '@/lib/actions/post';
import { auth } from '@/lib/auth';
import DeleteButton from '@/components/DeleteButton';
import ReactionButtons from '@/components/ReactionButtons';

type Props = {
  params: {
    id: string;
    postId: string;
    initialType?: 'like' | 'dislike' | null;
  };
};

export default async function PostDetailPage({ params }: Props) {
  const session = await auth();

  const loginUserId = session?.user?.id ? Number(session.user.id) : null;

  const post = await getPostById(Number(params.postId));
  if (!post || post.category_id !== Number(params.id)) return notFound();

  return (
    <div className='h-screen p-8 w-full'>
      <h1 className='flex justify-between text-3xl font-bold mb-2'>
        {post.title}
        <section className='flex gap-4 mr-4'>
          {loginUserId && (
            <ReactionButtons
              postId={post.post_id}
              userId={loginUserId}
              initialType={await getUserReaction(post.post_id, loginUserId)}
            />
          )}
        </section>
      </h1>

      <p className='text-sm text-gray-500 mb-6'>
        작성자: {post.User.name} &nbsp; 작성일:
        {format(new Date(post.writedt), 'yyyy-MM-dd')}
        {post.editdt && (
          <>&nbsp; | 수정일: {format(new Date(post.editdt), 'yyyy-MM-dd')}</>
        )}
      </p>

      <div className='mb-6'>{post.content}</div>

      {session?.user?.is_admin && (
        <div className='flex items-center justify-evenly mb-12'>
          <Link
            href={`/posts/edit/${post.post_id}`}
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
          >
            수정
          </Link>
          <DeleteButton postId={post.post_id} />
        </div>
      )}
    </div>
  );
}
