import { useActionState, useEffect, useOptimistic, useRef } from 'react';
import SearchButton from './SearchButton';

type Post = { id: number; title: string };

const searchPost = async (userId: string) =>
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`).then(
    res => res.json()
  );

export default function Posts() {
  const inpRef = useRef<HTMLInputElement>(null);
  const [posts, search, isPending] = useActionState<Post[], FormData>(
    async (_preState, formData) => {
      const userId = formData.get('searchStr')?.toString() || '1';
      setOpticStr(userId);
      const data = await searchPost(userId);
      return data;
    },
    []
  );

  const [opticStr, setOpticStr] = useOptimistic<string, string>(
    '',
    (_preState, opticValue) => opticValue
  );

  useEffect(() => {
    if (!isPending) inpRef.current?.focus();
  }, [isPending]);

  return (
    <>
      <h3>Post List</h3>
      <form action={search}>
        <input
          type='text'
          name='searchStr'
          ref={inpRef}
          disabled={isPending}
          placeholder='userId...'
        />

        <SearchButton />
      </form>
      <div>{isPending && `searching... ${inpRef.current?.value}`}</div>

      {!!opticStr && (
        <strong style={{ color: 'green' }}>optmisting... {opticStr}</strong>
      )}

      <ul>
        {posts.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    </>
  );
}
