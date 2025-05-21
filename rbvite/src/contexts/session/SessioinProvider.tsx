import {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  type PropsWithChildren,
} from 'react';
import {
  SessionContext,
  type Cart,
  type LoginUser,
  type Session,
} from './SessionContext';
import type { LoginHandler } from '../../components/Login';
import { useFetch } from '../../hooks/useFetch';

const KEY = 'SESSION_CART';

const setStorage = (cart: Cart[]) =>
  localStorage.setItem(KEY, JSON.stringify(cart));

const getStorage = () => JSON.parse(localStorage.getItem(KEY) ?? '[]');

type Action =
  | { type: 'INITIALIZE'; payload: Cart[] }
  | { type: 'LOGIN'; payload: LoginUser }
  | { type: 'LOGOUT'; payload: null }
  | { type: 'ADD-ITEM'; payload: Cart }
  | { type: 'EDIT-ITEM'; payload: Cart }
  | { type: 'REMOVE-ITEM'; payload: number };

const reducer = (session: Session, { type, payload }: Action) => {
  let cart: Cart[] = [];
  switch (type) {
    case 'LOGIN':
    case 'LOGOUT':
      return { ...session, loginUser: payload };
    case 'ADD-ITEM':
      cart = [...session.cart, payload];
      break;
    case 'EDIT-ITEM':
      cart = session.cart.filter(item =>
        item.id === payload.id ? payload : item
      );
      break;
    case 'REMOVE-ITEM':
      cart = session.cart.filter(item => item.id !== payload);
      break;
    case 'INITIALIZE':
      cart = payload;
      break;
    default:
      return session;
  }

  setStorage(cart);
  return { ...session, cart };
};

export default function SessionProvider({ children }: PropsWithChildren) {
  // const [session, setSession] = useState<Session>(SampleSession);
  // const [session, dispatch] = useReducer(reducer, SampleSession);

  const [session, dispatch] = useReducer(reducer, {
    cart: getStorage(),
    loginUser: { id: 1, name: 'Hong' },
  });

  const { data } = useFetch<Cart[]>('apis/sample.json');
  useEffect(() => {
    if (session.cart.length || !data) return;
    dispatch({ type: 'INITIALIZE', payload: data ?? [] });
  }, [data, session.cart]);

  const loginHandler = useRef<LoginHandler>(null);

  // const plusCount = () => setCount(c => c + 1);
  const login = useCallback((id: number, name: string) => {
    if (!loginHandler.current) return;
    const { getName, validate, str } = loginHandler.current;
    console.log('login>>>>', getName(), str);
    // if (validate()) setSession({ ...session, loginUser: { id, name } });
    if (validate()) dispatch({ type: 'LOGIN', payload: { id, name } });
  }, []);

  const logout = () => {
    // session.loginUser = null; // non-pure function!
    // setSession({ ...session, loginUser: null });
    dispatch({ type: 'LOGOUT', payload: null });
  };

  const removeItem = useCallback((id: number) => {
    // setSession({
    //   ...session,
    //   cart: session.cart.filter(item => item.id !== id),
    // });
    dispatch({ type: 'REMOVE-ITEM', payload: id });
  }, []);

  const addItem = (name: string, price: number) => {
    const id = Math.max(...session.cart.map(item => item.id), 0) + 1;
    // setSession({ ...session, cart: [...session.cart, { id, name, price }] });
    dispatch({ type: 'ADD-ITEM', payload: { id, name, price } });
  };

  const editItem = (workingItem: Cart) => {
    // setSession({
    //   ...session,
    //   cart: session.cart.map(item =>
    //     item.id === workingItem.id ? workingItem : item
    //   ),
    // });
    dispatch({ type: 'EDIT-ITEM', payload: workingItem });
  };

  return (
    <SessionContext
      value={{
        session,
        login,
        logout,
        addItem,
        removeItem,
        editItem,
        loginHandler,
      }}
    >
      {children}
    </SessionContext>
  );
}
