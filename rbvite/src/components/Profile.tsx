import type { RefObject } from "react";
import { useSession } from "../contexts/session/useSession";

type Props = {
  logoutButtonRef: RefObject<HTMLButtonElement | null>;
};

export default function Profile({ logoutButtonRef }: Props) {
  const {
    session: { loginUser },
    loginout,
  } = useSession();
  return (
    <>
      <h2>LoginUser: {loginUser?.name}</h2>
      <button onClick={loginout} ref={logoutButtonRef}>
        LogOut
      </button>
    </>
  );
}
