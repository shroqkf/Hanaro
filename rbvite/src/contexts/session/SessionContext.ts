import { createContext, createRef, use, type RefObject } from 'react';
import type { LoginHandler } from '../../components/Login';

export type LoginUser = {
  id: number;
  name: string;
};

export type Cart = {
  id: number;
  name: string;
  price: number;
};

export type Session = {
  loginUser: LoginUser | null;
  cart: Cart[];
};

type SessionContextProps = {
  session: Session;
  login: (id: number, name: string) => void;
  logout: () => void;
  addItem: (name: string, price: number) => void;
  removeItem: (id: number) => void;
  editItem: (item: Cart) => void;
  loginHandler: RefObject<LoginHandler | null>;
};

export const SessionContext = createContext<SessionContextProps>({
  session: { loginUser: null, cart: [] },
  login() {},
  logout() {},
  addItem() {},
  removeItem() {},
  editItem() {},
  loginHandler: createRef<LoginHandler>(),
});

export const useSession = () => use(SessionContext);
