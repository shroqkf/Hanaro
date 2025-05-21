import {
  useDeferredValue,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { useSession } from '../contexts/session/SessionContext';
import Item from './Item';
import ColorTitle from './ColorTitle';
import SlowList from './SlowList';
import { Link, useSearchParams } from 'react-router-dom';

export default function Items() {
  const {
    session: { cart },
  } = useSession();

  const [isAdding, toggleAdding] = useReducer(pre => !pre, false);
  const [searchStr, setSearchStr] = useState('');
  const deferedQuery = useDeferredValue(searchStr);

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  const [totalExpectPrice, addExpectPrice] = useReducer(
    (prePrice, newPrice) => totalPrice + newPrice + prePrice * 0,
    totalPrice
  );

  const qRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  console.log('🚀 searchParams:', searchParams);
  const q = searchParams.get('q') ?? '';
  useEffect(() => {
    if (!qRef.current) return;
    qRef.current.value = q;
    setSearchStr(q);
  }, [q]);

  const setSearch = () => {
    if (qRef.current?.value !== undefined)
      setSearchParams({ q: qRef.current.value });
  };

  const isSlow = false;

  return (
    <>
      <ColorTitle color={cart.length % 2 === 1 ? 'blue' : 'yellow'}>
        Total: {totalPrice.toLocaleString()}
      </ColorTitle>
      <h4>Expect: {totalExpectPrice.toLocaleString()}</h4>
      <div>
        <label htmlFor='search-str'>
          q:
          <input type='number' id='q' ref={qRef} onChange={setSearch} />
        </label>
      </div>
      <div>
        <label htmlFor='search-str'>
          검색{searchStr}
          <input
            type='text'
            id='search-str'
            onChange={evt => setSearchStr(evt.target.value)}
          />
        </label>
        {isSlow && <SlowList text={deferedQuery} />}
      </div>
      <ul>
        {cart
          .filter(item => item.name.includes(deferedQuery))
          .map(item => (
            <li key={item.id}>
              <Link to={`/items/${item.id}`}>{item.name}</Link>
            </li>
          ))}
        {isAdding ? (
          <li>
            <Item toggleAdding={toggleAdding} addExpectPrice={addExpectPrice} />
          </li>
        ) : (
          <button onClick={() => toggleAdding()}>ADD</button>
        )}
      </ul>
    </>
  );
}
