import {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { useSession } from "../contexts/session/useSession";
import { useCounter } from "../contexts/counter/useCounter";
import { useInterval, useTimeout } from "../hooks/useTimer";

export type LoginHandler = {
  str: string;
  getName: () => string;
  makeX: (n: number) => void;
  focusId: () => void;
  validate: () => boolean;
};

export default function Login() {
  const { login, loginHandlerRef } = useSession();
  const { plusCount, minusCount } = useCounter();
  const [x, setX] = useState(0);
  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const loginHandler: LoginHandler = {
    str: "STRING",
    makeX(n: number) {
      setX(n);
    },
    focusId() {
      idRef.current?.focus();
    },
    getName() {
      return nameRef.current?.value || "";
    },
    validate() {
      const id = Number(idRef.current?.value);
      const name = nameRef.current?.value;

      if (!id || isNaN(id)) {
        alert("Input the user id!");
        idRef.current?.focus();
        return false;
      } else if (!name) {
        alert("Input the user name!");
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
    const name = nameRef.current?.value ?? "";

    login(id, name);
  };

  useEffect(() => {
    alert("반값습니다! 로그인해주세요.");
    return () => {
      alert("로그인 성공!");
    };
  }, []);

  // Login 컴포넌트에 들어가면 count(CounterContext)를 1 증가시키고,
  // 로그인 완료 후 1 감소하도록 작성하시오.
  useEffect(() => {
    plusCount();
    return minusCount;
  }, [minusCount, plusCount]);

  useTimeout(console.log, 1000, "Hong", x);
  useTimeout(console.log, 1000, "Kim", 99);

  useInterval(setX, 1000, x + 1);
  useInterval(console.log, 1000, x);

  return (
    <form onSubmit={makeLogin}>
      <div>
        LoginID({x}):
        <input ref={idRef} type="number" />
      </div>
      <div>
        LoginName:
        <input type="text" ref={nameRef} />
      </div>
      <button type="reset">Cancel</button>
      <button type="submit">Login</button>
    </form>
  );
}
