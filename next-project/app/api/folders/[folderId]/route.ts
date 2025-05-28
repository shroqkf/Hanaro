import { notFound } from 'next/navigation';
import { FolderParams, folders } from '../folderdata';

export async function GET(_req: Request, { params }: FolderParams) {
  const { folderId } = await params;
  const folder = folders.find((f) => f.id === +folderId);
  if (!folder) return notFound();
  return Response.json(folder);
}

export async function PATCH(req: Request, { params }: FolderParams) {
  const { folderId } = await params;
  const folder = folders.find((f) => f.id === +folderId);
  if (!folder) throw new Error(`#${folderId} is not Found`);

  const { title } = await req.json();
  folder.title = title;

  return Response.json(folder);
}

export async function DELETE(req: Request, { params }: FolderParams) {
  const { folderId } = await params;
  const idx = folders.findIndex((f) => f.id === +folderId);
  if (idx === -1)
    return Response.json({ code: 404, message: `#${folderId} is not Found` });

  folders.splice(idx, 1);

  return Response.json({ msg: 'Delete OK' });
}
