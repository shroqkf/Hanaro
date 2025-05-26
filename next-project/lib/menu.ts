'use server';

export type Menu = {
  id: number;
  title: string;
};
const menus = [
  { id: 1, title: '공지사항' },
  { id: 2, title: '자유게시판' },
  { id: 3, title: '앨범' },
];

export const getMenus = async (): Promise<Menu[]> =>
  new Promise((resolve) => setTimeout(() => resolve(menus), 300));
