import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Cart } from "../contexts/session/SessionContext";
import { useSession } from "../contexts/session/useSession";

type Props = {
  item: Cart;
  toggleAdding?: () => void;
  addExpectPrice: (price: number) => void;
};

const Item = ({ item, toggleAdding, addExpectPrice }: Props) => {
  const { removeItem, editItem, addItem } = useSession();
  const itemNameRef = useRef<HTMLInputElement>(null);
  const itemPriceRef = useRef<HTMLInputElement>(null);
  const [isEditing, setEditing] = useState(false);
  const [hasDirty, setDirty] = useState(false);

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
    const { id } = item;
    if (id) {
      editItem({ id, name, price: +price });
    } else {
      addItem(name, +price);
      if (toggleAdding) toggleAdding();
    }
    setEditing(false);
  };

  const resetItem = () => {
    setEditing(false);
    setDirty(false);
    if (toggleAdding) toggleAdding();
    if (!item.id && itemPriceRef.current)
      addExpectPrice(-itemPriceRef.current.value);
  };

  const checkDirty = () => {
    setDirty(
      itemNameRef.current?.value !== item.name ||
        Number(itemPriceRef.current?.value) !== item.price
    );
  };

  useEffect(() => {
    if (!item.id) addExpectPrice(item.price);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.price]);

  return (
    <>
      {isEditing ? (
        <form onSubmit={submitItem} onReset={resetItem} onChange={checkDirty}>
          <input
            type="text"
            ref={itemNameRef}
            className="w-sm"
            placeholder="상품명.."
            onChange={checkDirty}
          />
          <input
            type="number"
            ref={itemPriceRef}
            placeholder="금액..."
            className="w-sm"
            onChange={(evt) => {
              checkDirty();
              if (!item.id) {
                addExpectPrice(item.id ? 0 : Number(evt.target.value));
              }
            }}
          />
          <button type="reset" className="p-sm">
            취소
          </button>
          <button type="submit" className="p-sm" disabled={!hasDirty}>
            {item.id ? "수정" : "추가"}
          </button>
        </form>
      ) : (
        <div>
          <a href="#" onClick={() => setEditing(!isEditing)}>
            {item.id}. {item.name} ({item.price.toLocaleString()})
          </a>
          <button onClick={() => removeItem(item.id)} className="p-sm">
            X
          </button>
        </div>
      )}
    </>
  );
};

export default Item;
