import { FaHome } from "react-icons/fa";
import { useCounter } from "../contexts/counter/useCounter";
import { useRef } from "react";
import type { HelloHandler } from "./Hello";
import { useLocation } from "react-router-dom";
import HanaButton from "./atoms/HanaButton";

export default function Home() {
  const { count } = useCounter();

  const helloButtonRef = useRef<HTMLButtonElement>(null);
  const logoutButtonRef = useRef<HTMLButtonElement>(null);
  const helloHandlerRef = useRef<HelloHandler>(null);

  const location = useLocation();
  const { state } = location;
  console.log("🚀 state:", state);

  return (
    <>
      <h2>
        <FaHome /> HOME ({count})
      </h2>

      <HanaButton
        variant="primary"
        size="md"
        onClick={() => helloButtonRef.current?.click()}
      >
        Click Primary
      </HanaButton>
      <HanaButton
        variant="danger"
        size="sm"
        onClick={() => helloButtonRef.current?.click()}
      >
        Click Danger
      </HanaButton>
      <button onClick={() => logoutButtonRef.current?.click()}>
        Logout in App
      </button>

      <button onClick={() => console.log(helloHandlerRef.current?.xx)}>
        sayHello
      </button>
    </>
  );
}
