import Profile from './Profile';
import { type RefObject } from 'react';

type Props = {
  logoutButtonRef: RefObject<HTMLButtonElement | null>;
};

export default function My({ logoutButtonRef }: Props) {
  return (
    <>
      <Profile logoutButtonRef={logoutButtonRef} />
    </>
  );
}
