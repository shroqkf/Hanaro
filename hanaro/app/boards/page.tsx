import BoardList from '@/components/BoardList';

export default function BoardsPage() {
  return (
    <div className='p-8'>
      <h1 className='text-3xl font-bold mb-6'>기술 게시판 목록</h1>
      <BoardList />
    </div>
  );
}
