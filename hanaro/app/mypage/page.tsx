'use client';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
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
  const [nameEdit, setNameEdit] = useState(false);
  const [emailEdit, setEmailEdit] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchMe = async () => {
      const res = await fetch('/api/member', { cache: 'no-store' });
      if (res.ok) {
        const me = await res.json();
        setUserInfo({ name: me.name, email: me.email });
        setNameInput(me.name);
        setEmailInput(me.email);
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
      if (field === 'name') setNameInput(updatedUser.name);
      if (field === 'email') setEmailInput(updatedUser.email);
    } else {
      console.error('프로필 수정 실패:', await res.json());
    }
  };

  const handleWithdraw = async () => {
    const res = await fetch('/api/member', {
      method: 'DELETE',
    });

    if (res.ok) {
      router.push('/');
    } else {
      console.error('회원 탈퇴 실패:', await res.json());
    }
  };

  return (
    <main className='max-w-4xl mx-auto py-10 px-4'>
      <h1 className='text-3xl font-bold mb-8 border-b pb-2'>마이페이지</h1>

      <section className='mb-6'>
        <h2 className='text-xl font-semibold mb-2'>
          👤 내 정보
          <span className='inline-block px-2 py-1 text-sm ml-8 rounded bg-gray-200 text-gray-700'>
            {session.user.is_admin ? '관리자' : '일반 독자'}
          </span>
        </h2>
        <div className='flex items-center gap-3 mt-2'>
          <span className='text-base'>
            이름: &nbsp;
            {nameEdit ? (
              <input
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onBlur={() => setNameEdit(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleUpdateProfile('name', nameInput);
                    setNameEdit(false);
                  }
                }}
                autoFocus
                className='border px-2 py-1 text-sm rounded'
              />
            ) : (
              <span
                onClick={() => {
                  setNameInput(userInfo.name);
                  setNameEdit(true);
                }}
                className='cursor-pointer hover:underline'
              >
                {userInfo.name}
              </span>
            )}
          </span>
        </div>
        <p className='mt-2'>
          이메일: &nbsp;
          {emailEdit ? (
            <input
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              onBlur={() => setEmailEdit(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleUpdateProfile('email', emailInput);
                  setEmailEdit(false);
                }
              }}
              autoFocus
              className='border px-2 py-1 text-sm rounded'
            />
          ) : (
            <span
              onClick={() => {
                setEmailInput(userInfo.email);
                setEmailEdit(true);
              }}
              className='cursor-pointer hover:underline'
            >
              {userInfo.email}
            </span>
          )}
        </p>
      </section>

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
