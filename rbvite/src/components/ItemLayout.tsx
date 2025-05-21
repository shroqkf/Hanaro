import { useReducer, useState } from "react";
import { type Cart, useSession } from "../contexts/session/SessionContext";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";
import Item from "./Item";

export default function ItemLayout() {
  const {
    session: { cart },
  } = useSession();

  const [isAdding, toggleAdding] = useReducer((pre) => !pre, false);

  const navigate = useNavigate();

  const [curItem, setCurItem] = useState<Cart>();

  // useEffect(() => {

  //   Socket.on('sync', ({ item }) => setCurItem(item));

  //   return () => Socket.close();
  // }, []);

  const goItemDetail = (item: Cart) => {
    setCurItem(item);
    navigate(item.id.toString()); // /items/:id
  };

  const { pathname } = useLocation();
  console.log("🚀 pathname:", pathname);
  const isListPage = pathname === "/items";

  return (
    <div className="border" style={{ width: "30rem" }}>
      <h2>ItemLayout(장바구니)</h2>
      {isListPage && (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <button onClick={() => goItemDetail(item)}>
                {item.id}. {item.name} <FaExternalLinkAlt />
              </button>
            </li>
          ))}
          {isAdding ? (
            <li>
              <Item toggleAdding={toggleAdding} />
            </li>
          ) : (
            <button onClick={() => toggleAdding()}>ADD</button>
          )}
        </ul>
      )}
      <div>
        <Outlet context={{ curItem }} />
      </div>
    </div>
  );
}
