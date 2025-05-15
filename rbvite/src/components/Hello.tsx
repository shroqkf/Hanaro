import {
  use,
  useImperativeHandle,
  type ForwardedRef,
  type PropsWithChildren,
  type RefObject,
} from "react";
// import { useCounter } from "../contexts/counter/useCounter";
import { CounterContext } from "../contexts/counter/CounterContext";
import { useFetch } from "../hooks/useFetch";
import { useToggle } from "../hooks/useToggle";

export type HelloHandler = {
  sayHello: () => void;
};

type Props = {
  name: string;
  id: number;
  helloButtonRef: RefObject<HTMLButtonElement | null>;
  ref: ForwardedRef<HelloHandler>;
};

export default function Hello({
  helloButtonRef,
  children,
  ref,
  id,
}: PropsWithChildren<Props>) {
  // const { plusCount } = useCounter();  <- react19 이전 버전
  const { plusCount } = use(CounterContext);
  const [reload, toggleReload] = useToggle();

  const {
    data: user,
    isLoading,
    error,
  } = useFetch<{ id: number; name: string }>(
    `https://jsonplaceholder.typicode.com/users/${id}`,
    [id, reload]
  );

  const helloHandler = {
    sayHello() {
      alert(`Hello, ${user?.name}!`);
    },
  };

  // ref.current = helloHandler;
  useImperativeHandle(ref, () => helloHandler);

  return (
    <div className="border">
      <h3>
        Hello, {isLoading ? "..." : user?.name}
        <small>{user?.id}</small>
        <div>{error}</div>
      </h3>

      <div>{children}</div>
      <button ref={helloButtonRef} onClick={plusCount}>
        count + 1
      </button>
      <button onClick={toggleReload}>Reload</button>
    </div>
  );
}
