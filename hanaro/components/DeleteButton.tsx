'use client';

import { useRouter } from 'next/navigation';

type Props = {
  postId: number;
};

export default function DeleteButton({ postId }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    const ok = confirm('정말 삭제하시겠습니까?');
    if (!ok) return;

    const formData = new FormData();
    formData.append('_method', 'DELETE');

    const res = await fetch(`/api/posts/${postId}`, {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      router.push('/posts');
    } else {
      alert('삭제 실패');
    }
  };

  return (
    <button
      onClick={handleDelete}
      className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
    >
      삭제
    </button>
  );
}
