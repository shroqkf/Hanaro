import {
  useImperativeHandle,
  useRef,
  useState,
  type FormEvent,
  type RefObject,
} from "react";
import type { LoginFn } from "../App";

export type LoginHandler = {
  str: string;
  getName: () => string;
  makeX: (n: number) => void;
  focusId: () => void;
  validate: () => boolean;
};

type Props = {
  login: LoginFn;
  loginHandlerRef: RefObject<LoginHandler | null>;
};

export default function Login({ login, loginHandlerRef }: Props) {
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
