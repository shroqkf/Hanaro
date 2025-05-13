import type { RefObject } from "react";
import type { LoginUser } from "../App";

type Props = {
  loginUser: LoginUser;
  logout: () => void;
  logoutButtonRef: RefObject<HTMLButtonElement | null>;
};

export default function Profile({ loginUser, logout, logoutButtonRef }: Props) {
  return (
    <>
      <h2>LoginUser: {loginUser?.name}</h2>
      <button onClick={logout} ref={logoutButtonRef}>
        LogOut
      </button>
    </>
  );
}
