import { useState } from "react";
import "./App.css";
import Hello from "./components/Hello";
import My from "./components/My";

export type LoginFn = (id: number, name: string) => void;
export type LoginUser = { id: number; name: string };
export type Cart = { id: number; name: string; price: number };
export type Session = {
  loginUser: LoginUser | null;
  cart: Cart[];
};

const SampleSession = {
  // loginUser: null, (logout)
  loginUser: { id: 1, name: "Hong" },
  cart: [
    { id: 100, name: "라면", price: 3000 },
    { id: 101, name: "컵라면", price: 2000 },
    { id: 200, name: "파", price: 5000 },
  ],
};

function App() {
  const [session, setSession] = useState<Session>(SampleSession);
  const [count, setCount] = useState(0);

  const plusCount = () => setCount((count) => count + 1);
  const login = (id: number, name: string) => {
    setSession({ ...session, loginUser: { id, name } });
  };
  const logout = () => {
    // session.loginUser = null; // <- non-pure function
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
    setSession({ ...session, cart: [...session.cart, { id, name, price }] });
  };

  const editItem = (workingItem: Cart) => {
    setSession({
      ...session,
      cart: session.cart.map((item) =>
        item.id == workingItem.id ? workingItem : item
      ),
    });
  };

  return (
    <>
      <h2>count: {count}</h2>

      <My
        session={session}
        login={login}
        logout={logout}
        removeItem={removeItem}
        addItem={addItem}
        editItem={editItem}
      />
      <Hello name={"홍길동"} age={33} plusCount={plusCount}>
        반갑습니다!
      </Hello>
    </>
  );
}

export default App;
