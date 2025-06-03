import { notFound, redirect } from 'next/navigation';
import { getPostById, updatePost } from '@/lib/actions/post';
import { auth } from '@/lib/auth';
import PostForm from '@/components/PostForm';

type Props = {
  params: {
    postId: string;
  };
};

export default async function EditPostPage({ params }: Props) {
  const session = await auth();
  const loginUserId = session?.user?.id ? Number(session.user.id) : null;

  const postId = Number(params.postId);
  const post = await getPostById(postId);
  if (!post) return notFound();

  const isAdmin = session?.user?.is_admin;

  if (!isAdmin) {
    redirect('/posts');
  }

  const handleSubmit = async (data: {
    title: string;
    content: string;
    userId: number;
  }) => {
    'use server';
    const { title, content } = data;
    await updatePost(postId, title, content);
    redirect(`/boards/${post.category_id}/${postId}`);
  };

  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold mb-6'>게시글 수정</h1>
      <PostForm
        onSubmit={handleSubmit}
        initialTitle={post.title}
        initialContent={post.content ?? ''}
        initialCategoryId={post.category_id}
      />
    </div>
  );
}
