'use client';

import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export type Props = {
  postId: number;
  userId: number;
  initialType?: 'like' | 'dislike' | null;
};

export default function ReactionButtons({
  postId,
  userId,
  initialType,
}: Props) {
  const [reaction, setReaction] = useState<'like' | 'dislike' | null>(
    initialType ?? null
  );
  const [count, setCount] = useState({ likes: 0, dislikes: 0 });

  // 좋아요/싫어요 수 가져오기
  const fetchCounts = async () => {
    const res = await fetch(`/api/reaction/summary?postId=${postId}`);
    if (res.ok) {
      const data = await res.json();
      setCount(data);
    }
  };

  // 현재 사용자 반응 상태 가져오기
  const fetchUserReaction = async () => {
    const res = await fetch(
      `/api/reaction/user?postId=${postId}&userId=${userId}`
    );
    if (res.ok) {
      const data = await res.json();
      setReaction(data.type);
    }
  };

  useEffect(() => {
    fetchCounts();
    fetchUserReaction();
  }, [postId, userId]);

  const handleClick = async (type: 'like' | 'dislike') => {
    const res = await fetch('/api/reaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId, post_id: postId, type }),
    });

    if (res.ok) {
      const newReaction = reaction === type ? null : type;
      setReaction(newReaction);
      fetchCounts();
    }
  };

  return (
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
        <ThumbsDown className={reaction === 'dislike' ? 'text-red-600' : ''} />
        <span className='text-sm'>{count.dislikes}</span>
      </div>
    </section>
  );
}
