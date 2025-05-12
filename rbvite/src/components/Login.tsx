import { useState } from "react";
import type { LoginFn } from "../App";

type Props = {
  login: LoginFn;
};

export default function Login({ login }: Props) {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");

  const makeLogin = () => {
    if (id == null || isNaN(id) || !name) {
      alert("아이디와 이름을 입력해주세요");
      return;
    }
    login(id, name);
  };

  //   const submitHandler = () => {};

  return (
    <>
      <div>
        Login ID:
        <input type="number" onChange={(e) => setId(+e.currentTarget.value)} />
      </div>
      <div>
        Login Name:
        <input type="text" onChange={(e) => setName(e.currentTarget.value)} />
      </div>
      <button onClick={makeLogin}>Login</button>
    </>
  );
}
