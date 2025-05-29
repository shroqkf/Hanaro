'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signIn } from 'next-auth/react';
import { use } from 'react';
import { snsLogin } from '@/lib/actions/sign';

type Props = {
  searchParams: Promise<{ callbackUrl: string }>;
};

export default function SignIn({ searchParams }: Props) {
  const { callbackUrl } = use(searchParams);

  const login = async (formData: FormData) => {
    const email = formData.get('email');
    const password = formData.get('password');

    // if (!email || !password) {
    //   alert('Email and Password is required!');
    //   return;
    // }

    let redirectTo = callbackUrl;
    if (!callbackUrl || callbackUrl.endsWith('signin')) redirectTo = '/';

    if (redirectTo !== '/') alert(redirectTo);
    const sign = await signIn('credentials', {
      email,
      password,
      redirectTo,
    });

    console.log('🚀 sign:', sign);
  };

  const myLogin = async (service: string) => {
    await snsLogin(service, callbackUrl ?? '/');
  };

  return (
    <div className='flex flex-col items-center space-x-3'>
      <h2 className='text-2xl mb-3'>Sign In</h2>
      <form
        action={login}
        className='flex flex-col w-3/5 justify-center items-center gap-3 border p-3 rounded-md'
      >
        <Input type='email' name='email' placeholder='email...' />
        <Input type='password' name='password' placeholder='password...' />

        <div className='flex space-x-5 mt-3'>
          <Button type='reset'>Cancel</Button>
          <Button variant={'primary'} type='submit'>
            Login
          </Button>
        </div>
      </form>
      {/* <hr className='my-3 border border-sky-200 w-full' /> */}

      <div className='flex justify-center space-x-3 p-3'>
        <Button variant={'destructive'} onClick={() => myLogin('google')}>
          Google
        </Button>

        <Button variant={'primary'} onClick={() => myLogin('github')}>
          Github
        </Button>

        <Button variant={'success'} onClick={() => myLogin('naver')}>
          Naver
        </Button>

        <Button variant={'secondary'} onClick={() => myLogin('kakao')}>
          Kakao
        </Button>
      </div>
    </div>
  );
}
