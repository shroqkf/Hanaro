import { createContext, createRef, type RefObject } from "react";
import type { LoginHandler } from "../../components/Login";

export type LoginUser = {
  id: number;
  name: string;
};

export type LoginFn = (id: number, name: string) => void;

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
  login: LoginFn;
  loginout: () => void;
  removeItem: (id: number) => void;
  addItem: (name: string, price: number) => void;
  editItem: (item: Cart) => void;
  loginHandlerRef: RefObject<LoginHandler | null>;
};

export const SessionContext = createContext<SessionContextProps>({
  session: { loginUser: { id: 0, name: "" }, cart: [] },
  login: () => {},
  loginout: () => {},
  removeItem: () => {},
  addItem: () => {},
  editItem: () => {},
  loginHandlerRef: createRef<LoginHandler>(),
});
