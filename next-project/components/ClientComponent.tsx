'use client';

import { Folder } from '@/app/api/folders/folderdata';
import { PropsWithChildren, useState } from 'react';

type Props = {
  name: string;
  fAction: () => Promise<Folder[]>;
};

export default function ClientComponent({
  name,
  fAction,
  children,
}: PropsWithChildren<Props>) {
  const [folders, setFolders] = useState<Folder[]>([]);

  // const plusCount = () => console.log('plus!!!');

  return (
    <>
      <h1 className='text-2xl'>Client Component: {name}</h1>
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
