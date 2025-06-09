'use client';

import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

type Props = {
  postId: number;
};

export default function DeleteButton({ postId }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className='flex items-center gap-1 px-4 py-2 bg-gray-500 text-white cursor-pointer rounded hover:bg-red-500'>
          <Trash2 size={16} />
          <span>삭제</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>게시글을 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            이 작업은 되돌릴 수 없습니다. 정말 삭제하시겠습니까?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>삭제</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
