// export const dynamic = 'force-dynamic';
import ClientComponent from '@/components/ClientComponent';
import ServerComponent from '@/components/ServerComponent';
import { use } from 'react';
import { getFolders } from '@/app/lib/folders';

type Props = {
  searchParams: Promise<{ q: string }>;
};
export default function Hello({ searchParams }: Props) {
  const { q } = use(searchParams);
  // console.log('🚀 q:', q);

  return (
    <div className='border m-1 p-1'>
      <h3 className='font-bold'>
        Hello Page~ <span className='text-red-500'>{q}</span>
      </h3>
      <div className='text-xs'>{`${new Date()}`}</div>
      <hr />
      <ClientComponent name={'Hong'} fAction={getFolders}>
        <ServerComponent f={getFolders} />
      </ClientComponent>
    </div>
  );
}
