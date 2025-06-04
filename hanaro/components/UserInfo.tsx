'use client';

import { useState } from 'react';

type Props = {
  userInfo: { name: string; email: string };
  onUpdate: (field: 'name' | 'email', value: string) => void;
  isAdmin: boolean;
};

export default function UserInfo({ userInfo, onUpdate, isAdmin }: Props) {
  const [nameEdit, setNameEdit] = useState(false);
  const [emailEdit, setEmailEdit] = useState(false);
  const [nameInput, setNameInput] = useState(userInfo.name);
  const [emailInput, setEmailInput] = useState(userInfo.email);

  return (
    <section className='mb-6'>
      <h2 className='text-xl font-semibold mb-2'>
        👤 내 정보
        <span className='inline-block px-2 py-1 text-sm ml-8 rounded bg-gray-200 text-gray-700'>
          {isAdmin ? '관리자' : '일반 독자'}
        </span>
      </h2>
      <div className='flex items-center gap-3 mt-2'>
        <span className='text-base'>
          이름: &nbsp;
          {nameEdit ? (
            <input
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onBlur={() => {
                onUpdate('name', nameInput);
                setNameEdit(false);
              }}
              autoFocus
              className='border px-2 py-1 text-sm rounded'
            />
          ) : (
            <span
              onClick={() => setNameEdit(true)}
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
            onBlur={() => {
              onUpdate('email', emailInput);
              setEmailEdit(false);
            }}
            autoFocus
            className='border px-2 py-1 text-sm rounded'
          />
        ) : (
          <span
            onClick={() => setEmailEdit(true)}
            className='cursor-pointer hover:underline'
          >
            {userInfo.email}
          </span>
        )}
      </p>
    </section>
  );
}
