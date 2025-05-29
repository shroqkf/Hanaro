import { use } from 'react';

type Todo = { id: number; title: string };

// export const dynamic = 'force-static';
export const revalidate = 10;
export const dynamicParams = false;

const getTodo = async (todoId: string) => {
  const data = (await fetch(
    `https://jsonplaceholder.typicode.com/posts/${todoId}`
  ).then((res) => res.json())) as Todo;

  return data;
};

type Params = {
  params: Promise<{ todoId: string }>;
};

const TODOS = ['1', '100'];
export const generateStaticParams = () => TODOS.map((todoId) => ({ todoId }));

export async function generateMetadata({ params }: Params) {
  const { todoId } = await params;
  const { title } = await getTodo(todoId);
  return { title };
}

export default function TodoPage({ params }: Params) {
  const { todoId } = use(params);
  const { id, title } = use(getTodo(todoId));

  return (
    <>
      <h1 className='text-2xl'>Todo - {id}</h1>
      {title}
    </>
  );
}
