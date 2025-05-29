'use client';

import Image from 'next/image';

type Props = {
  image?: string | null;
  name: string;
  logoutAction: () => void;
};
export default function ProfileImageButton({
  name,
  image,
  logoutAction,
}: Props) {
  return (
    <>
      <button onClick={logoutAction} className='cursor-pointer'>
        {image ? (
          <Image alt={name} src={image} width={100} height={100} unoptimized />
        ) : (
          name
        )}
      </button>
    </>
  );
}
