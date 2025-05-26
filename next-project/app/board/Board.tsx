import { MenuDropDown } from '@/components/MenuDropDown';
import { Button } from '@/components/ui/button';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function Board() {
  return (
    <>
      <div className='flex m-4 space-x-2 '>
        <DropdownMenu>
          <MenuDropDown />
        </DropdownMenu>
        <Input type='text' placeholder='title..' />
      </div>

      <div className='flex flex-col mt-6'>
        <Textarea className='h-24' placeholder='content...' />
      </div>
      <section className='flex justify-evenly mt-4'>
        <Button>취소</Button>
        <Button variant={'destructive'}>삭제</Button>
        <Button variant={'default'}>저장</Button>
      </section>
    </>
  );
}
