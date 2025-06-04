'use client';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import UserInfo from '@/components/UserInfo';
import UserTable from '@/components/UserTable';
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
import { Button } from '@/components/ui/button';

type User = {
  user_id: number;
  name: string;
  email: string;
  is_admin: boolean;
};

export default function MyPage() {
  const { data: session, status } = useSession();

  const [users, setUsers] = useState<User[]>([]);
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchMe = async () => {
      const res = await fetch('/api/member', { cache: 'no-store' });
      if (res.ok) {
        const me = await res.json();
        setUserInfo({ name: me.name, email: me.email });
      }
    };
    if (session?.user) {
      fetchMe();
    }
  }, [session]);

  useEffect(() => {
    if (session?.user?.is_admin) {
      fetch('/api/admin')
        .then((res) => res.json())
        .then((data) => {
          const filtered = data.filter(
            // 본인 계정 빼고 회원 목록 나오도록
            (u: User) => u.user_id !== Number(session.user.id)
          );
          setUsers(filtered);
        });
    }
  }, [session]);

  if (status === 'loading') return <div>로딩 중...</div>;
  if (!session) redirect('/login');

  const user = session.user as typeof session.user & { is_admin?: boolean };

  const handleUpdateProfile = async (
    field: 'name' | 'email',
    value: string
  ) => {
    const res = await fetch('/api/member', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: value }),
    });

    if (res.ok) {
      const updatedUser = await res.json();
      setUserInfo({ name: updatedUser.name, email: updatedUser.email });
    } else {
      console.error('프로필 수정 실패:', await res.json());
    }
  };

  const handleWithdraw = async () => {
    const res = await fetch('/api/member', {
      method: 'DELETE',
    });

    if (res.ok) {
      await signOut({ callbackUrl: '/' });
    } else {
      console.error('회원 탈퇴 실패:', await res.json());
    }
  };

  return (
    <main className='max-w-4xl mx-auto py-10 px-4'>
      <h1 className='text-3xl font-bold mb-8 border-b pb-2'>마이페이지</h1>

      <UserInfo
        userInfo={userInfo}
        onUpdate={handleUpdateProfile}
        isAdmin={session.user.is_admin}
      />

      {user?.is_admin ? (
        <>
          <section className='mb-12'>
            <h2 className='text-xl font-semibold mt-10 mb-4'>📘 게시글 관리</h2>
            <div className='space-y-2'>
              <div className='flex gap-3'>
                <Link href='/posts/new'>
                  <Button>새 글 작성</Button>
                </Link>
                <Link href='/posts'>
                  <Button variant='outline'>전체 글 보기</Button>
                </Link>
              </div>
            </div>
          </section>

          <UserTable users={users} search={search} onSearchChange={setSearch} />
        </>
      ) : (
        <section className='space-x-4'>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='destructive'>회원 탈퇴</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>정말로 탈퇴하시겠습니까?</AlertDialogTitle>
                <AlertDialogDescription>
                  이 작업은 되돌릴 수 없습니다. 계정이 즉시 삭제됩니다.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>취소</AlertDialogCancel>
                <AlertDialogAction onClick={handleWithdraw}>
                  탈퇴 확인
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </section>
      )}
    </main>
  );
}
