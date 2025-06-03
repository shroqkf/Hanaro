'use client';

import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { use } from 'react';
import { snsLogin } from '@/lib/actions/signin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Props = {
  searchParams: Promise<{ callbackUrl: string }>;
};

export default function SignIn({ searchParams }: Props) {
  const { callbackUrl } = use(searchParams);

  const login = async (formData: FormData) => {
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
      alert('Email과 Password가 입력되지 않았습니다.');
      return;
    }

    const result = await signIn('credentials', {
      email,
      password,
      callbackUrl: callbackUrl ?? '/',
      redirect: false,
    });

    if (result?.error) {
      alert('로그인 실패: ' + result.error);
    } else if (result?.ok) {
      window.location.href = result.url || '/';
    }
  };

  const myLogin = async (service: string) => {
    await snsLogin(service, callbackUrl ?? '/');
  };

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <form
        action={login}
        className='flex flex-col w-3/5 max-w-md justify-center items-center gap-8 border px-10 py-20 rounded-md shadow-md'
      >
        <Input
          type='email'
          name='email'
          placeholder='email...'
          className='p-6'
        />
        <Input
          type='password'
          name='password'
          placeholder='password...'
          className='p-6'
        />

        <div className='flex space-x-5 mt-3'>
          <Button variant={'outline'} type='reset'>
            취소
          </Button>
          <Button type='submit'>로그인</Button>
        </div>
      </form>

      <div className='flex justify-center space-x-3 p-3'>
        <Button variant={'link'} onClick={() => myLogin('github')}>
          <Image src={'/Github.svg'} alt='Github-icon' width={20} height={20} />
          Github 로그인
        </Button>
      </div>
      <div className='flex justify-center space-x-3 p-3'>
        <Link
          href={'/register'}
          className='flex gap-2 cursor-pointer hover:underline'
        >
          <Image src={'/window.svg'} alt='회원가입' width={20} height={20} />
          회원가입
        </Link>
      </div>
    </div>
  );
}
