'use client';

import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { Button } from './components/ui/button';

// 404 페이지를 만들지 않으면 next.js default 페이지 자동 생성
export default function NotFoundPage() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className='flex justify-center items-center my-20'>
      <h1 className='text-2xl mb-10'>404: Not Found {pathname} Page </h1>
      <Button onClick={() => router.back()} variant={'outline'}>
        뒤로가기
      </Button>
    </div>
  );
}
