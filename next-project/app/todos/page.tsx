import Link from 'next/link';
import { use } from 'react';

const getTodos = async () => {
  return fetch('https://jsonplaceholder.typicode.com/posts').then((res) =>
    res.json()
  );
};

export default function Todos() {
  const todos = use(getTodos());
  console.log('🚀 todos:', todos?.length);
  return (
    <>
      <h1 className='text-2xl'>Todos Page: {todos.length}</h1>
      <Link href={`/todos/${todos[0].id}`}>First Todo</Link>|
      <Link href={`/todos/${todos[99].id}`}>Last Todo</Link>
    </>
  );
}
