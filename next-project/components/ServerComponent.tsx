import { Folder } from '@/app/api/folders/folderdata';

type Props = {
  f: () => Promise<Folder[]>;
};

export default async function ServerComponent({ f }: Props) {
  const saction = async (formData: FormData) => {
    'use server';
    console.log('xxxxxxxx>', formData.get('x'));
    const folders = await f();
    console.log('🚀 server-folders:', folders);
  };
  return (
    <>
      <h2>Server Component</h2>
      <form action={saction}>
        <button type='submit' className='btn'>
          ServerBTN
        </button>
      </form>
    </>
  );
}
