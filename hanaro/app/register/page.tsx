'use client';

import { signIn } from 'next-auth/react';
import { use } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Props = {
  searchParams: Promise<{ callbackUrl: string }>;
};

export default function Register({ searchParams }: Props) {
  const { callbackUrl } = use(searchParams);

  const handleSubmit = async (formData: FormData) => {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!name || !email || !password) {
      alert('모든 값을 입력해주세요.');
      return;
    }

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || '회원가입 실패');
      return;
    }

    const result = await signIn('credentials', {
      email,
      password,
      redirect: true,
      callbackUrl: callbackUrl ?? '/',
    });

    console.log('자동 로그인 결과:', result);
  };

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <form
        action={handleSubmit}
        className='flex flex-col w-3/5 max-w-md justify-center items-center gap-8 border px-10 py-20 rounded-md shadow-md'
      >
        <Input name='name' type='text' placeholder='이름' className='p-6' />
        <Input
          name='email'
          type='email'
          placeholder='email...'
          className='p-6'
        />
        <Input
          name='password'
          type='password'
          placeholder='password...'
          className='p-6'
        />

        <div className='flex space-x-5 mt-3'>
          <Button variant='outline' type='reset'>
            취소
          </Button>
          <Button type='submit'>회원가입</Button>
        </div>
      </form>
    </div>
  );
}
