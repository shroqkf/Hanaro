'use client';

import { useState } from 'react';
import { categories } from '@/constants/categories';
import CategoryDropDown from './CategoryDropDown';
import { Button } from './ui/button';
import { Input } from './ui/input';

type Props = {
  onSubmit: (data: {
    title: string;
    content: string;
    categoryId: number;
    userId: number;
  }) => void;
  initialTitle?: string;
  initialContent?: string;
  initialCategoryId?: number;
};

export default function PostForm({
  onSubmit,
  initialTitle = '',
  initialContent = '',
  initialCategoryId,
}: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [categoryId, setCategoryId] = useState<number | null>(
    initialCategoryId ? Number(initialCategoryId) : null
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) {
      alert('카테고리를 선택해주세요.');
      return;
    }
    onSubmit({
      title,
      content,
      categoryId,
      userId: 1,
    });
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <CategoryDropDown
        categories={categories}
        selectedId={categoryId}
        onSelect={setCategoryId}
      />

      <Input
        type='text'
        placeholder='제목'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='w-full border p-2'
      />
      <textarea
        placeholder='내용을 입력해주세요..'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className='w-full h-60 border p-2 rounded resize-none'
      />

      <div className='flex justify-end'>
        <Button
          type='submit'
          variant='link'
          size='lg'
          className='bg-blue-500 text-white px-4 py-2 rounded'
        >
          저장
        </Button>
      </div>
    </form>
  );
}
