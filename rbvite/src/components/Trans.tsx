import { use, useActionState, useEffect, useOptimistic, useState } from 'react';
import { useFormStatus } from 'react-dom';
type User = { id: number; name: string };

async function searchUser(userId: string) {
  return fetch<Comp>(
    `https://jsonplaceholder.typicode.com/users/${userId.at(-1)}`
  ).then(res => res.json());
}
// async function searchUser(userId: string) {
//   return new Promise(resolve => {
//     setTimeout(() => resolve({ id: userId, name: 'Sampler' }), 2000);
//   });
// }

type Msg = { text: string; sending?: boolean };

export default function Trans() {
  const [str, setStr] = useState('');
  const [list, search, isPending] = useActionState(
    async (preList: User[], formData: FormData) => {
      const value = formData.get('value')?.toString() ?? '';
      setStr(value);
      setOptimisticMessage(value);
      const data = (await searchUser(value)) as User;
      console.log('🚀 data:', data, preList);
      return [data];
    },
    []
  );

  const [optimisticMessage, setOptimisticMessage] = useOptimistic(
    { text: '', sending: false },
    (currState: Msg, text: string) => {
      console.log('🚀 currState:', currState);
      console.log('🚀 optimisticValue:', text);
      return { text, sending: true };
    }
  );

  return (
    <>
      <h3>{isPending ? <Spinner /> : str}</h3>
      <h4>
        {optimisticMessage.sending && 'Search...'}
        <strong style={{ color: 'red' }}>{optimisticMessage.text}</strong>
      </h4>
      <form action={search}>
        <input type='text' name='value' placeholder='userId...' />
        <DesignedButton />
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

function DesignedButton() {
  const { pending } = useFormStatus();
  // const { pending, data, method, action } = useFormStatus();
  // console.log('🚀 data:', data?.get('value'), method, action);
  return <button disabled={pending}>DesignedButton</button>;
}

function Spinner() {
  return <strong>Pending...</strong>;
}
