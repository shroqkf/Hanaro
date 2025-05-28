import { NextRequest, NextResponse } from 'next/server';
import { FolderParams, getPostsByFolderId, posts } from '../../folderdata';

export async function GET(req: NextRequest, { params }: FolderParams) {
  const { folderId } = await params;
  const { searchParams } = req.nextUrl;
  const myPosts = getPostsByFolderId(folderId);
  const q = searchParams.get('q');
  const results = q
    ? myPosts.filter(({ title }) => title.includes(q))
    : myPosts;
  return NextResponse.json(results);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const id = Math.max(...posts.map(({ id }) => id), 0) + 1;
  const newPost = { id, ...body };
  posts.push(newPost);
  return NextResponse.json(body);
}
