'use client';

import { useSession } from 'next-auth/react';
import { PropsWithChildren, useState } from 'react';
import { Folder } from '@/app/api/folders/folderdata';

type Props = {
  name: string;
  fAction: () => Promise<Folder[]>;
};

export default function ClientComponent({
  name,
  fAction,
  children,
}: PropsWithChildren<Props>) {
  const { data: session } = useSession();
  const [folders, setFolders] = useState<Folder[]>([]);

  // const plusCount = () => console.log('plus!!!');

  return (
    <>
      <h1 className='text-2xl'>Client Component: {name}</h1>
      {!!session?.user && <h2>{session.user.name}</h2>}
      <button
        onClick={async () => {
          const folders = await fAction();
          console.log('🚀 folders:', folders);
          setFolders(folders);
        }}
        className='btn'
      >
        BTN: {folders.map((f) => f.title).join(' | ')}
      </button>

      <hr />
      <div>{children}</div>
    </>
  );
}
