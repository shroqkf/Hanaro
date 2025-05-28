export type Folder = {
  id: number;
  title: string;
};

export type Post = {
  folder: Folder['id'];
  id: number;
  title: string;
  writer: string;
  content: string;
};

export type FolderParams = {
  params: Promise<{ folderId: string }>;
};

export type FolderPostParams = {
  params: Promise<{ folderId: string; postId: string }>;
};

export const getPostsByFolderId = (folderId: string) =>
  posts.filter((p) => p.folder === +folderId);

export const getPostsByPostId = (postId: string) =>
  posts.find((p) => p.id === +postId);

export const folders: Folder[] = [
  { id: 1, title: '공지사항' },
  { id: 2, title: '자유게시판' },
  { id: 3, title: '앨범' },
];

export const posts: Post[] = [
  { folder: 1, id: 1, title: '공지1', writer: '김1수', content: '...' },
  { folder: 1, id: 2, title: '공지2', writer: '김2수', content: '...' },
  { folder: 2, id: 3, title: '게시글1', writer: '김3수', content: '...' },
  {
    folder: 3,
    id: 4,
    title: '앨범1',
    writer: '김3수',
    content: 'https://picsum.photos/id/0/5000/3333',
  },
];
