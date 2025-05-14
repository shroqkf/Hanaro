import { useContext } from "react";
import { CounterContext } from "./CounterContext";

// useCounter는 커스텀 훅
export const useCounter = () => useContext(CounterContext);
