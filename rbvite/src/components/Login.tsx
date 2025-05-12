import { useRef, type FormEvent } from "react";
import type { LoginFn } from "../App";

type Props = {
  login: LoginFn;
};

export default function Login({ login }: Props) {
  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const makeLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = Number(idRef.current?.value);
    const name = nameRef.current?.value;

    if (id == null || isNaN(id)) {
      alert("아이디를 입력해주세요");
      idRef.current?.focus();
      return;
    } else if (!name) {
      alert("이름을 입력해주세요");
      nameRef.current?.focus();
      return;
    }
    login(id, name);
  };

  return (
    <form onSubmit={makeLogin}>
      <div>
        Login ID:
        <input ref={idRef} type="number" />
      </div>
      <div>
        Login Name:
        <input ref={nameRef} type="text" />
      </div>
      <button type="reset">Cancel</button>
      <button type="submit">Login</button>
    </form>
  );
}
