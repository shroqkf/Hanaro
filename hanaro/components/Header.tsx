'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import SearchBox from './SearchBox';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className='w-full border-b bg-white sticky top-0 z-50'>
      <div className='max-w-5xl mx-auto px-4 py-4 flex justify-between items-center'>
        <Link
          href='/'
          className='text-2xl font-bold text-gray-900 hover:text-green-700 transition-colors'
        >
          {session?.user?.name ? `${session.user.name}'s dev` : '기술 블로그'}
        </Link>

        <div className='flex items-center gap-6'>
          <SearchBox />

          <Menubar className='bg-transparent border-none shadow-none'>
            <MenubarMenu>
              <MenubarTrigger className='text-gray-700 hover:text-green-700 text-base transition-colors'>
                글 목록
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem asChild>
                  <Link href='/posts'>전체 게시글</Link>
                </MenubarItem>
                <MenubarItem asChild>
                  <Link href='/boards'>게시판 목록</Link>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger className='text-gray-700 hover:text-green-700 text-base transition-colors'>
                사용자
              </MenubarTrigger>
              <MenubarContent>
                {session?.user ? (
                  <>
                    <MenubarItem asChild>
                      <Link href='/mypage'>마이페이지</Link>
                    </MenubarItem>
                    <MenubarItem asChild>
                      <Link href='/api/auth/signout?callbackUrl=/login'>
                        로그아웃
                      </Link>
                    </MenubarItem>
                  </>
                ) : (
                  <>
                    <MenubarItem asChild>
                      <Link href='/login'>로그인</Link>
                    </MenubarItem>
                    <MenubarItem asChild>
                      <Link href='/register'>회원가입</Link>
                    </MenubarItem>
                  </>
                )}
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
    </header>
  );
}
