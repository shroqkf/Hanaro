import { NextRequest, NextResponse } from 'next/server';
import { books } from './bookdata';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const q = searchParams.get('q');
  const results = q ? books.filter(({ title }) => title.includes(q)) : books;
  return NextResponse.json(results);
}

export async function POST(req: NextRequest) {
  // const { title, writer } = await req.json();
  const body = await req.json();
  const id = Math.max(...books.map(({ id }) => id), 0) + 1;
  const newBook = { id, ...body };
  books.push(newBook);
  return NextResponse.json(body);
}
