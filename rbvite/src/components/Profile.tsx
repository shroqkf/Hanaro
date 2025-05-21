import { useEffect, type RefObject } from 'react';
import { useSession } from '../contexts/session/SessionContext';
import Trans from './Trans';

type Props = {
  logoutButtonRef: RefObject<HTMLButtonElement | null>;
};

export default function Profile({ logoutButtonRef }: Props) {
  const {
    session: { loginUser },
    logout,
  } = useSession();

  console.log('ffffffffff');
  const f = () => console.log('sss>>>', loginUser?.name);
  const arr = [1, 2, 3];
  useEffect(() => {
    f();
  }, [f, arr]);

  return (
    <>
      <h1>My Page</h1>
      <Trans />
      <h3>LoginUser: {loginUser?.name}</h3>
      <button ref={logoutButtonRef} onClick={logout}>
        LogOut
      </button>
    </>
  );
}
