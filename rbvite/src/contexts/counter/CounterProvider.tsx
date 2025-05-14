import { useState, type PropsWithChildren } from "react";
import { CounterContext } from "./CounterContext";

export const CounterProvider = ({ children }: PropsWithChildren) => {
  const [count, setCount] = useState(0);
  const plusCount = () => setCount((pre) => pre + 1);
  const minusCount = () => setCount((pre) => pre - 1);
  return (
    // value는 항상 객체 타입
    <CounterContext.Provider value={{ count, plusCount, minusCount }}>
      {children}
    </CounterContext.Provider>
  );
};
