'use client';

import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import Image from 'next/image';
import { useReducer } from 'react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

type Category = {
  id: number;
  name: string;
  icon: string;
};

type Props = {
  categories: readonly Category[];
  selectedId: number | null;
  onSelect: (id: number) => void;
};

export default function CategoryDropDown({
  categories,
  selectedId,
  onSelect,
}: Props) {
  const [isOpen, toggleOpen] = useReducer((v) => !v, false);
  const selectedCategory = categories.find((cate) => cate.id === selectedId);

  return (
    <DropdownMenu onOpenChange={toggleOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          className='w-full flex justify-between items-center'
        >
          <span className='flex items-center gap-2'>
            {selectedCategory?.icon && (
              <Image
                src={selectedCategory.icon}
                alt={selectedCategory.name}
                width={20}
                height={20}
              />
            )}
            {selectedCategory?.name ||
              '게시글을 등록할 게시판 카테고리를 선택해주세요'}
          </span>
          {isOpen ? (
            <ChevronUpIcon className='ml-2 h-4 w-4' />
          ) : (
            <ChevronDownIcon className='ml-2 h-4 w-4' />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-full'>
        {categories.map((cate) => (
          <DropdownMenuCheckboxItem
            key={cate.id}
            checked={selectedId === cate.id}
            onClick={() => onSelect(cate.id)}
            className='cursor-pointer flex items-center gap-2'
          >
            <Image src={cate.icon} alt={cate.name} width={20} height={20} />
            {cate.name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
