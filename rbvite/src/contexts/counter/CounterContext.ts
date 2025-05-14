import { createContext } from "react";

type ContextCounterProps = {
  count: number;
  plusCount: () => void;
};

// 컴포넌트나 훅의 경우 export를 각각의 파일에서 하라고 린트가 경고함
export const CounterContext = createContext<ContextCounterProps>({
  count: 0,
  plusCount: () => {},
});
