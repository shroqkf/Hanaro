'use client';

import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { useEffect, useReducer, useState } from 'react';
import { getMenus, Menu } from '@/lib/menu';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function MenuDropDown() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [menu, setMenu] = useState<Menu>();
  const [isOpen, toggleOpen] = useReducer((p) => !p, false);

  useEffect(() => {
    (async function () {
      const mns = await getMenus();
      setMenus(mns);
      setMenu(mns[0]);
    })();
  }, []);

  return (
    <DropdownMenu onOpenChange={toggleOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          {menu?.title}
          {isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {menus.map((m) => (
          <DropdownMenuCheckboxItem
            key={m.id}
            checked={menu?.id === m.id}
            onClick={() => setMenu(m)}
          >
            {m.title}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
