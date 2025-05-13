import type { Cart, LoginFn, Session } from "../App";
import Login from "./Login";
import Profile from "./Profile";
import Item from "./Item";
import { useState } from "react";

type Props = {
  session: Session;
  login: LoginFn;
  logout: () => void;
  removeItem: (id: number) => void;
  addItem: (name: string, price: number) => void;
  editItem: (item: Cart) => void;
};

export default function My({
  session: { loginUser, cart },
  login,
  logout,
  removeItem,
  addItem,
  editItem,
}: Props) {
  const [isAdding, setAdding] = useState(false);
  const toggleAdding = () => setAdding(!isAdding);

  return (
    <>
      {loginUser ? (
        <Profile loginUser={loginUser} logout={logout} />
      ) : (
        <Login login={login} />
      )}

      <div>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <Item
                item={item}
                removeItem={removeItem}
                addItem={addItem}
                editItem={editItem}
              />
            </li>
          ))}
          {isAdding ? (
            <li>
              <Item
                item={{ id: 0, name: "", price: 3000 }}
                removeItem={removeItem}
                addItem={addItem}
                editItem={editItem}
                toggleAdding={toggleAdding}
              />
            </li>
          ) : (
            <button onClick={() => setAdding(true)}>ADD</button>
          )}
        </ul>
      </div>
    </>
  );
}
