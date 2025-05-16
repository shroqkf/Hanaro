import Login from "./Login";
import Profile from "./Profile";
import Item from "./Item";
import {
  useEffect,
  useMemo,
  useReducer,
  useState,
  type RefObject,
} from "react";
import { useSession } from "../contexts/session/useSession";
// import { useToggle } from "../hooks/useToggle";

type Props = {
  logoutButtonRef: RefObject<HTMLButtonElement | null>;
};

type Post = {
  id: number;
  title: string;
};

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts?userId=1";

export default function My({ logoutButtonRef }: Props) {
  const {
    session: { loginUser, cart },
  } = useSession();
  // const [isAdding, setAdding] = useState(false);
  // const toggleAdding = () => setAdding(!isAdding);

  // const [isAdding, toggleAdding] = useToggle();
  const [isAdding, toggleAdding] = useReducer((pre) => !pre, false);

  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState(null);

  const totalPrice = useMemo(
    () => cart.reduce((acc, item) => acc + item.price, 0),
    [cart]
  );

  const [totalExpectPrice, addExpectPrice] = useReducer(
    (prePrice, newPrice) => totalPrice + newPrice + prePrice * 0,
    totalPrice
  );

  useEffect(() => {
    // (async function () {
    //   const res = await fetch(POSTS_URL);
    //   const data = await res.json();
    // })();
    const controller = new AbortController();
    const { signal } = controller;
    fetch(POSTS_URL, { signal })
      .then((res) => res.json())
      // .then((data) => setPosts(data));
      .then(setPosts)
      .catch((err) => {
        console.log("err:", err);
        if (!signal.aborted) setError(err);
      });

    return () => controller.abort();
  }, []);

  return (
    <>
      {loginUser ? <Profile logoutButtonRef={logoutButtonRef} /> : <Login />}

      <div>
        <h3>Total: {totalPrice.toLocaleString()}</h3>
        <h4>Expect: {totalExpectPrice.toLocaleString()}</h4>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <Item item={item} addExpectPrice={addExpectPrice} />
            </li>
          ))}
          {isAdding ? (
            <li>
              <Item
                item={{ id: 0, name: "", price: 3000 }}
                toggleAdding={toggleAdding}
                addExpectPrice={addExpectPrice}
              />
            </li>
          ) : (
            <button onClick={() => toggleAdding()}>ADD</button>
          )}
        </ul>
        <p>{JSON.stringify(error)}</p>
        <ul>
          {posts.map(({ id, title }) => (
            <li key={id}>
              {id}
              <strong>{title}</strong>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
