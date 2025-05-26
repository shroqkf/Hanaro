import { use } from 'react';

// export const dynamic = 'force-dynamic';
type Props = {
  searchParams: Promise<{ q: string }>;
};
export default function Hello({ searchParams }: Props) {
  const { q } = use(searchParams);
  return (
    <>
      <h3 className='font-bold'>
        Hello Page<span className='text-red-500'>{q}</span>
      </h3>
      <div className='text-xs'>{`${new Date()}`}</div>
    </>
  );
}
