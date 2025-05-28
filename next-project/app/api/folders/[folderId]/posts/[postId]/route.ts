import { notFound } from 'next/navigation';
import { FolderPostParams, getPostsByPostId, posts } from '../../../folderdata';

export async function GET(_req: Request, { params }: FolderPostParams) {
  const { postId } = await params;
  const post = getPostsByPostId(postId);
  if (!post) return notFound();
  return Response.json(post);
}

export async function PUT(req: Request, { params }: FolderPostParams) {
  const { folderId, postId } = await params;
  const post = getPostsByPostId(postId);
  if (!post) throw new Error(`#${postId} is not Found`);

  const { folder, title, writer, content } = await req.json();
  post.folder = folder || +folderId;
  post.title = title;
  post.writer = writer;
  post.content = content;

  return Response.json(post);
}

export async function DELETE(req: Request, { params }: FolderPostParams) {
  const { postId } = await params;
  const idx = posts.findIndex((p) => p.id === +postId);
  if (idx === -1)
    return Response.json({ code: 404, message: `#${postId} is not Found` });

  posts.splice(idx, 1);

  return Response.json({ msg: 'Delete OK' });
}
