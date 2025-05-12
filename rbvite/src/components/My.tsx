import { useRef, useState, type FormEvent } from "react";
import type { Cart, LoginFn, Session } from "../App";
import Login from "./Login";
import Profile from "./Profile";

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
  const itemNameRef = useRef<HTMLInputElement>(null);
  const itemPriceRef = useRef<HTMLInputElement>(null);
  const [workingItem, setWorkingItem] = useState<Cart | null>(null);

  const submitItem = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = itemNameRef.current?.value;
    const price = itemPriceRef.current?.value;
    if (!name) {
      alert("상품명을 입력하세요!");
      itemNameRef.current?.focus();
      return;
    }
    if (!price) {
      alert("금액을 입력하세요!");
      itemPriceRef.current?.focus();
      return;
    }
    if (workingItem) {
      editItem({ id: workingItem.id, name, price: +price });
      setWorkingItem(null);
    } else {
      addItem(name, +price);
    }
    if (itemNameRef.current && itemPriceRef.current) {
      itemNameRef.current.value = "";
      itemPriceRef.current.value = "";
      itemNameRef.current.focus();
    }
  };
  return (
    <>
      {loginUser ? (
        <Profile loginUser={loginUser} logout={logout} />
      ) : (
        <Login login={login} />
      )}
      <div>
        <h1>{workingItem?.name}</h1>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <a
                href="#"
                onClick={() => {
                  setWorkingItem(item);
                  if (itemNameRef.current && itemPriceRef.current) {
                    itemNameRef.current.value = item.name;
                    itemPriceRef.current.value = `${item.price}`;
                  }
                }}
              >
                {item.id} {item.name}({item.price.toLocaleString()})
              </a>

              <button onClick={() => removeItem(item.id)} className="p-sm">
                X
              </button>
            </li>
          ))}
        </ul>
        {workingItem ? (
          <form onSubmit={submitItem}>
            <input
              type="text"
              ref={itemNameRef}
              className="w-sm"
              placeholder="상품명.."
            />
            <input
              type="number"
              ref={itemPriceRef}
              placeholder="금액..."
              className="w-sm"
            />
            <button type="submit">수정</button>
          </form>
        ) : (
          <form onSubmit={submitItem}>
            <input
              type="text"
              ref={itemPriceRef}
              placeholder="금액..."
              className="w-sm"
            />
            <button type="submit">추가</button>
          </form>
        )}
      </div>
    </>
  );
}
