'use client';

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SearchBox() {
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      router.push(`/posts?q=${encodeURIComponent(keyword.trim())}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className='relative flex items-center w-80 border-[0.2] border-gray-300 rounded-2xl'
      aria-label='검색창'
    >
      <Input
        type='text'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='검색어를 입력하세요...'
        className='pr-10 rounded-2xl'
      />
      <Button
        type='submit'
        size='icon'
        variant='ghost'
        className='absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600'
      >
        <Search className='h-4 w-4' />
      </Button>
    </form>
  );
}
