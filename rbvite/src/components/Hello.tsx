import {
  use,
  useImperativeHandle,
  type ForwardedRef,
  type PropsWithChildren,
  type RefObject,
} from "react";
// import { useCounter } from "../contexts/counter/useCounter";
import { CounterContext } from "../contexts/counter/CounterContext";

export type HelloHandler = {
  sayHello: () => void;
};

type Props = {
  name: string;
  age: number;
  helloButtonRef: RefObject<HTMLButtonElement | null>;
  ref: ForwardedRef<HelloHandler>;
};

// {name: '홍길동'}
export default function Hello({
  name,
  age,
  helloButtonRef,
  children,
  ref,
}: PropsWithChildren<Props>) {
  // const { plusCount } = useCounter();  <- react19 이전 버전
  const { plusCount } = use(CounterContext);

  const helloHandler = {
    sayHello() {
      alert(`Hello, ${name}!`);
    },
  };

  // ref.current = helloHandler;
  useImperativeHandle(ref, () => helloHandler);

  return (
    <div className="border">
      <h3>
        Hello {name} <small>({age})</small>
      </h3>
      <div>{children}</div>
      <button ref={helloButtonRef} onClick={plusCount}>
        count + 1
      </button>
    </div>
  );
}
