import { useRef } from "react";
import "./App.css";
import Hello, { type HelloHandler } from "./components/Hello";
import My from "./components/My";
import { useCounter } from "./contexts/counter/useCounter";
import { SessionProvider } from "./contexts/session/SessionProvider";

function App() {
  // const [count, setCount] = useState(0);
  // const { count } = useContext(CounterContext);
  const { count } = useCounter();

  // React의 usable은 Context와 Promise 2개가 있다!
  // const { count } = use(CounterContext);

  const helloButtonRef = useRef<HTMLButtonElement>(null);
  const helloHandlerRef = useRef<HelloHandler>(null);
  const logoutButtonRef = useRef<HTMLButtonElement>(null);

  // const plusCount = () => setCount((c) => c + 1);

  return (
    <>
      <h2>count: {count}</h2>
      <SessionProvider>
        <My logoutButtonRef={logoutButtonRef} />
      </SessionProvider>
      <Hello
        name={"홍길동"}
        age={33}
        helloButtonRef={helloButtonRef}
        ref={helloHandlerRef}
      >
        반갑습니다!
      </Hello>
      <button onClick={() => helloButtonRef.current?.click()}>
        Click Hello
      </button>
      <button onClick={() => logoutButtonRef.current?.click()}>
        Logout in App
      </button>

      <button>sayHello</button>
    </>
  );
}

export default App;
