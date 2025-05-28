'use server';

export type Folder = { id: number; title: string };
const Folders = [
  { id: 1, title: '공지사항' },
  { id: 2, title: '자유게시판' },
  { id: 3, title: '앨범' },
];

export const getFolders = async (): Promise<Folder[]> =>
  new Promise((resolve) => setTimeout(() => resolve(Folders), 500));
