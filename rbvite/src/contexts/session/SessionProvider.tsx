import type { LoginHandler } from "../../components/Login";
import {
  SessionContext,
  type Cart,
  type LoginUser,
  type Session,
} from "./SessionContext";
import { useCallback, useReducer, useRef, type PropsWithChildren } from "react";

const SampleSession: Session = {
  // loginUser: null,
  loginUser: { id: 1, name: "Hong" },
  cart: [
    { id: 100, name: "라면", price: 3000 },
    { id: 101, name: "컵라면", price: 2000 },
    { id: 200, name: "파", price: 5000 },
  ],
};

type Action =
  | { type: "LOGIN"; payload: LoginUser }
  | { type: "LOGOUT"; payload: null }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "ADD_ITEM"; payload: Cart }
  | { type: "EDIT_ITEM"; payload: Cart };

const reducer = (session: Session, { type, payload }: Action) => {
  switch (type) {
    case "LOGIN":
    case "LOGOUT":
      return { ...session, loginUser: payload };
    case "REMOVE_ITEM":
      return {
        ...session,
        cart: session.cart.filter((item) => item.id !== payload),
      };
    case "ADD_ITEM":
      return {
        ...session,
        cart: [...session.cart, payload],
      };
    case "EDIT_ITEM":
      return {
        ...session,
        cart: session.cart.filter((item) =>
          item.id === payload.id ? payload : item
        ),
      };
    default:
      return session;
  }
};

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const [session, dispatch] = useReducer(reducer, SampleSession);

  const loginHandlerRef = useRef<LoginHandler>(null);

  const login = useCallback((id: number, name: string) => {
    if (!loginHandlerRef.current) return;
    const { getName, validate, str } = loginHandlerRef.current;
    console.log("login>>", getName(), str);
    if (validate()) dispatch({ type: "LOGIN", payload: { id, name } });
  }, []);

  const loginout = () => {
    dispatch({ type: "LOGOUT", payload: null });
  };

  const removeItem = useCallback((id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  }, []);

  const addItem = (name: string, price: number) => {
    const id = Math.max(...session.cart.map((item) => item.id), 0) + 1;
    dispatch({ type: "ADD_ITEM", payload: { id, name, price } });
  };

  const editItem = (workingItem: Cart) => {
    dispatch({ type: "EDIT_ITEM", payload: workingItem });
  };

  return (
    // value는 항상 객체 타입
    <SessionContext.Provider
      value={{
        session,
        login,
        loginout,
        removeItem,
        addItem,
        editItem,
        loginHandlerRef,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
