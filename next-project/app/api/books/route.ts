import { NextRequest, NextResponse } from 'next/server';
import { books } from './bookdata';

// api/books?q=123 : 책 제목이 123인 책 데이터 가져오기
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const q = searchParams.get('q');
  const results = q ? books.filter(({ title }) => title.includes(q)) : books;
  return NextResponse.json(results);
}

// http://localhost:3000/api/books 결과
// [{"id":1,"title":"1st book","writer":"hong"},{"id":2,"title":"2nd book","writer":"kim","msdn":"1234-1232-4324"},{"id":3,"title":"3rd book","writer":"lee"}]

// http://localhost:3000/api/books?q=1 결과
// [
//    {
//      "id": 1,
//      "title": "1st book",
//      "writer": "hong"
//    }
// ]
