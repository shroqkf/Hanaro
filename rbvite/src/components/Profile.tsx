import type { LoginUser } from "../App";

type Props = {
  loginUser: LoginUser;
  logout: () => void;
};

export default function Profile({ loginUser, logout }: Props) {
  return (
    <>
      <h2>LoginUser: {loginUser?.name}</h2>
      <button onClick={logout}>LogOut</button>
    </>
  );
}
