import {
  use,
  useImperativeHandle,
  type ForwardedRef,
  type PropsWithChildren,
  type RefObject,
} from 'react';
import { CounterContext } from '../contexts/counter/CounterContext';
import { useFetch } from '../hooks/useFetch';
import { useToggle } from '../hooks/useToggle';
import LabelInput from './LabelInput';

export type HelloHandler = {
  xx: string;
  sayHello: () => void;
};

type Props = {
  id: number;
  helloButtonRef: RefObject<HTMLButtonElement | null>;
  refx: ForwardedRef<HelloHandler>;
};

type User = {
  id: number;
  name: string;
};

export default function Hello({
  id,
  helloButtonRef,
  children,
  refx,
}: PropsWithChildren<Props>) {
  // const { plusCount } = useCounter();
  const { plusCount } = use(CounterContext);
  const [reloadFlag, toggleReload] = useToggle();

  const helloHandler = {
    xx: 'XXXX',
    sayHello() {
      alert(`Hello, Mr.${name}!`);
    },
  };

  // refx.current = helloHandler;
  useImperativeHandle(refx, () => helloHandler);

  const {
    data: user,
    isLoading,
    error,
  } = useFetch<User>(`https://jsonplaceholder.typicode.com/users/${id}`, [
    id,
    reloadFlag,
  ]);

  return (
    <div className='border'>
      <h3>
        Hello, {isLoading ? '...' : user?.name}
        <div>{error}</div>
      </h3>
      <div>
        {children} ({id})
      </div>
      <button ref={helloButtonRef} onClick={() => plusCount()}>
        count + 1
      </button>
      <button onClick={toggleReload}>Reload</button>
      <LabelInput label='email' />
      <LabelInput label='nickname' />
    </div>
  );
}
