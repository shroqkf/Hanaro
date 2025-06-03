'use client';

import { useRouter } from 'next/navigation';
import PostForm from '@/components/PostForm';

type Props = {
  postId: number;
  categoryId: number;
  initialTitle: string;
  initialContent: string;
};

type FormDataType = {
  userId: number;
  title: string;
  content: string;
  categoryId: number;
};

export default function EditForm({
  postId,
  categoryId,
  initialTitle,
  initialContent,
}: Props) {
  const router = useRouter();

  const handleSubmit = async (formData: { title: string; content: string }) => {
    const res = await fetch(`/api/posts/${postId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push(`/boards/${categoryId}/${postId}`);
    } else {
      alert('수정 실패');
    }
  };

  return (
    <PostForm
      initialTitle={initialTitle}
      initialContent={initialContent}
      initialCategoryId={categoryId}
      onSubmit={(data: FormDataType) => {
        const { title, content } = data;
        handleSubmit({ title, content });
      }}
    />
  );
}
