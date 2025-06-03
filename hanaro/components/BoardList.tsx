import Image from 'next/image';
import Link from 'next/link';
import BoardPreview from '@/components/BoardPreview';
import { categories } from '@/constants/categories';

export default function BoardList() {
  return (
    <section className='mt-8'>
      <ul className='grid grid-cols-2 gap-4'>
        {categories.map((cate) => (
          <li key={cate.id} className='border-2 rounded hover:bg-gray-100 h-80'>
            <div className='p-8 font-bold'>
              <Link
                href={`/boards/${cate.id}`}
                className='flex items-center gap-2'
              >
                <Image
                  src={cate.icon}
                  alt={cate.name}
                  width={40}
                  height={40}
                  className='mb-2'
                />
                {cate.name}
              </Link>
              <BoardPreview categoryId={Number(cate.id)} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
