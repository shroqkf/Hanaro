'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { PropsWithChildren, useLayoutEffect, useState } from 'react';

export default function HelloLayout({ children }: PropsWithChildren) {
  const [state, setState] = useState('');
  const sparams = useSearchParams();
  useLayoutEffect(() => {
    setState(sparams.get('q') ?? '');
  }, [sparams]);
  const router = useRouter();
  const pathName = usePathname();
  console.log('🚀 HelloLayout pathName:', pathName);
  const setSearchParams = () => {
    const urlParams = new URLSearchParams(sparams.toString());
    urlParams.set('q', `${new Date()}`);
    urlParams.set('r', `rrr`);
    router.push(`/hello?${urlParams.toString()}`);
  };
  return (
    <>
      <h1>This is Hello Layout: {state}</h1>
      <ul className='flex gap-3'>
        <li>
          <Link href='/hello/morning'>Morning</Link>
        </li>
        <li>
          <Link href='/hello/afternoon'>Afternoon</Link>
        </li>
        <li>
          <Link href='/hello/evening'>Evening</Link>
        </li>
      </ul>
      <hr />
      <div>{children}</div>
      <button onClick={setSearchParams}>SetParam</button>
    </>
  );
}
