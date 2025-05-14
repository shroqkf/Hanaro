import type { LoginHandler } from "../../components/Login";
import { SessionContext, type Cart, type Session } from "./SessionContext";
import { useRef, useState, type PropsWithChildren } from "react";

const SampleSession: Session = {
  // loginUser: null,
  loginUser: { id: 1, name: "Hong" },
  cart: [
    { id: 100, name: "라면", price: 3000 },
    { id: 101, name: "컵라면", price: 2000 },
    { id: 200, name: "파", price: 5000 },
  ],
};

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session>(SampleSession);

  const login = (id: number, name: string) => {
    if (!loginHandlerRef.current) return;
    const { getName, validate, str } = loginHandlerRef.current;
    console.log("login>>", getName(), str);
    if (validate()) setSession({ ...session, loginUser: { id, name } });
  };

  const loginout = () => {
    // session.loginUser = null; // non-pure function!
    setSession({ ...session, loginUser: null });
  };

  const removeItem = (id: number) => {
    setSession({
      ...session,
      cart: session.cart.filter((item) => item.id !== id),
    });
  };

  const addItem = (name: string, price: number) => {
    const id = Math.max(...session.cart.map((item) => item.id), 0) + 1;
    console.log("🚀 name:", id, name, price);
    setSession({ ...session, cart: [...session.cart, { id, name, price }] });
  };

  const editItem = (workingItem: Cart) => {
    setSession({
      ...session,
      cart: session.cart.map((item) =>
        item.id === workingItem.id ? workingItem : item
      ),
    });
  };

  const loginHandlerRef = useRef<LoginHandler>(null);

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
