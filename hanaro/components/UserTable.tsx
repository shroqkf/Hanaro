import Link from 'next/link';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type User = {
  user_id: number;
  name: string;
  email: string;
  is_admin: boolean;
};

type Props = {
  users: User[];
  search: string;
  onSearchChange: (value: string) => void;
};

export default function UserTable({ users, search, onSearchChange }: Props) {
  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className='mt-12'>
      <h2 className='text-xl font-semibold mb-4'>👥 회원 관리</h2>
      <Input
        placeholder='닉네임 또는 이메일 검색'
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className='mb-4 max-w-md'
      />

      <div className='border rounded-md'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>유저 ID</TableHead>
              <TableHead>닉네임</TableHead>
              <TableHead>이메일</TableHead>
              <TableHead>권한</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length > 0 ? (
              filtered.map((user) => (
                <TableRow key={user.user_id} className='hover:bg-muted'>
                  <TableCell className='font-medium text-blue-600'>
                    <Link href={`/admin/users/${user.user_id}`}>
                      {`user${user.user_id}`}
                    </Link>
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.is_admin ? '관리자' : '일반 사용자'}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className='text-center text-gray-500'>
                  검색 결과가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
