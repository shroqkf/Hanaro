import { useState, useTransition, type ChangeEvent } from 'react';
type Comp = { id: number; name: string };

async function searchUser(userId: string) {
  return fetch(
    `https://jsonplaceholder.typicode.com/users/${userId.at(-1)}`
  ).then(res => res.json());
}

export default function Trans() {
  const [str, setStr] = useState('');
  const [list, setList] = useState<Comp[]>([]);

  const [isPending, startTransition] = useTransition();

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setStr(value);
    startTransition(async () => {
      const data = await searchUser(value);
      console.log('🚀 data:', data);
      setList([data]);
    });
    // startTransition(() => {
    //   const comps = [];
    //   for (let i = 0; i < 20000; i++) comps.push({ id: i, name: value });
    //   setList(comps);
    // });
  };

  return (
    <>
      <h3>{isPending ? <Spinner /> : str}</h3>
      <form>
        <input type='text' onChange={handleChange} placeholder='trans...' />
      </form>
      <ul>
        {list.map(({ id, name }) => (
          <li key={id}>
            {id}. {name}
          </li>
        ))}
      </ul>
      <hr />
    </>
  );
}

function Spinner() {
  return <strong>Pending...</strong>;
}
