'use client';

import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';

export type Props = {
  postId: number;
  userId: number | null;
  initialType?: 'like' | 'dislike' | null;
};

export default function ReactionButtons({
  postId,
  userId,
  initialType,
}: Props) {
  const router = useRouter();
  const [reaction, setReaction] = useState<'like' | 'dislike' | null>(
    initialType ?? null
  );
  const [count, setCount] = useState({ likes: 0, dislikes: 0 });
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  useEffect(() => {
    fetchCounts();
    if (userId) fetchUserReaction();
  }, [postId, userId]);

  const fetchCounts = async () => {
    const res = await fetch(`/api/reaction/summary?postId=${postId}`);
    if (res.ok) {
      const data = await res.json();
      setCount(data);
    }
  };

  const fetchUserReaction = async () => {
    const res = await fetch(
      `/api/reaction/user?postId=${postId}&userId=${userId}`
    );
    if (res.ok) {
      const data = await res.json();
      setReaction(data.type);
    }
  };

  const handleClick = async (type: 'like' | 'dislike') => {
    if (!userId) {
      setShowLoginDialog(true);
      return;
    }

    const res = await fetch('/api/reaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, post_id: postId, type }),
    });

    if (res.ok) {
      const newReaction = reaction === type ? null : type;
      setReaction(newReaction);
      fetchCounts();
    }
  };

  return (
    <>
      <section className='flex items-center gap-6 mt-2'>
        <div
          className='flex items-center gap-1 cursor-pointer'
          onClick={() => handleClick('like')}
        >
          <ThumbsUp className={reaction === 'like' ? 'text-blue-600' : ''} />
          <span className='text-sm'>{count.likes}</span>
        </div>
        <div
          className='flex items-center gap-1 cursor-pointer'
          onClick={() => handleClick('dislike')}
        >
          <ThumbsDown
            className={reaction === 'dislike' ? 'text-red-600' : ''}
          />
          <span className='text-sm'>{count.dislikes}</span>
        </div>
      </section>

      <AlertDialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>로그인이 필요한 기능입니다</AlertDialogTitle>
            <AlertDialogDescription>
              좋아요 또는 싫어요 기능은 로그인한 사용자만 이용할 수 있습니다.
              로그인 페이지로 이동하시겠습니까?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowLoginDialog(false)}>
              취소
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => router.push('/login')}>
              로그인하러 가기
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
