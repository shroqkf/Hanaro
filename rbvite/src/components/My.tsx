import Login from "./Login";
import Profile from "./Profile";
import Item from "./Item";
import { useState, type RefObject } from "react";
import { useSession } from "../contexts/session/useSession";

type Props = {
  logoutButtonRef: RefObject<HTMLButtonElement | null>;
};

export default function My({ logoutButtonRef }: Props) {
  const {
    session: { loginUser, cart },
  } = useSession();
  const [isAdding, setAdding] = useState(false);
  const toggleAdding = () => setAdding(!isAdding);

  return (
    <>
      {loginUser ? <Profile logoutButtonRef={logoutButtonRef} /> : <Login />}

      <div>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <Item item={item} />
            </li>
          ))}
          {isAdding ? (
            <li>
              <Item
                item={{ id: 0, name: "", price: 3000 }}
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
