import {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type FormEvent,
} from 'react';
import { useSession } from '../contexts/session/SessionContext';
import { useCounter } from '../contexts/counter/useCounter';
import { useInterval, useTimeout } from '../hooks/useTimer';

export type LoginHandler = {
  str: string;
  getName: () => string;
  makeX: (n: number) => void;
  focusId: () => void;
  validate: () => boolean;
};

export default function Login({ title = 'LOGIN' }: { title?: string }) {
  const { login, loginHandler: loginHandlerRef } = useSession();
  const { plusCount, minusCount } = useCounter();
  const [x, setX] = useState(0);
  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const loginHandler: LoginHandler = {
    str: 'STRING',
    makeX(n: number) {
      setX(n);
    },
    focusId() {
      idRef.current?.focus();
    },
    getName() {
      return nameRef.current?.value || '';
    },
    validate() {
      const id = Number(idRef.current?.value);
      const name = nameRef.current?.value;

      if (!id || isNaN(id)) {
        alert('Input the user id!');
        idRef.current?.focus();
        return false;
      } else if (!name) {
        alert('Input the user name!');
        nameRef.current?.focus();
        return false;
      }

      return true;
    },
  };

  useImperativeHandle(loginHandlerRef, () => loginHandler);

  const makeLogin = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const id = Number(idRef.current?.value);
    const name = nameRef.current?.value ?? '';

    login(id, name);
  };

  useEffect(() => {
    plusCount();
    return minusCount;
    // return () => minusCount();
  }, [plusCount, minusCount]);

  // useTimeout(console.log, 1000, 'Hong', x);
  // useTimeout(console.log, 1000, 'Kim', 99);

  // const f = useCallback(() => {
  //   setX(x => x + 1);
  // }, []);

  // interval도 만들었다면,
  console.log('xxxxxx>>', x);
  const { reset, clear } = useInterval(() => setX(x => x + 1), 1000);
  // reset(); // Danger!! call every render
  useTimeout(reset, 2000);
  useTimeout(clear, 5000);

  useEffect(() => idRef.current?.focus(), []);

  const tit = `MyBlob::${title}`;

  return (
    <>
      <title>{tit}</title>
      <meta name='Author' content={tit} />
      <form onSubmit={makeLogin}>
        <div>
          LoginID({x}):
          <input ref={idRef} type='number' />
        </div>
        <div>
          LoginName:
          <input type='text' ref={nameRef} />
        </div>
        <button type='reset'>Cancel</button>
        <button type='submit'>Login</button>
      </form>
      <button onClick={() => setX(x => x + 1)}>Set X</button>
    </>
  );
}
