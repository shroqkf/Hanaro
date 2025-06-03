// /app/posts/new/page.tsx
import { redirect } from 'next/navigation';
import { createPost } from '@/lib/actions/post';
import PostForm from '@/components/PostForm';

export default function NewPostPage() {
  const handleSubmit = async (formData: {
    title: string;
    content: string;
    categoryId: number;
    userId: number;
  }) => {
    'use server';
    const { title, content, categoryId, userId } = formData;

    if (isNaN(categoryId)) {
      throw new Error('Invalid categoryId');
    }

    await createPost(categoryId, userId, title, content);
    redirect(`/boards/${categoryId}`);
  };

  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold mb-4'>게시글 작성</h1>
      <PostForm onSubmit={handleSubmit} />
    </div>
  );
}
