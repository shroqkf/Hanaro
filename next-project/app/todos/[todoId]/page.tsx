import { use } from 'react';

export const revalidate = 10;
export const dynamicParams = false;

type Todo = {
  id: number;
  title: string;
};
type Props = {
  params: Promise<{ todoId: string }>;
};

async function getTodo(id: string) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) =>
    res.json()
  );
}

const TODOS = ['1', '100'];
export const generateStaticParams = () => TODOS.map((todoId) => ({ todoId }));

export default function TodoPage({ params }: Props) {
  const { todoId } = use(params);
  console.log('🚀 todoId:', todoId);
  const { id, title } = use(getTodo(todoId)) as Todo;
  return (
    <>
      <h1>Todo Page: {todoId}</h1>
      {id}. {title}
    </>
  );
}
