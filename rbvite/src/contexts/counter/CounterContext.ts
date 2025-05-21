import { createContext } from 'react';

type CounterContextProps = {
  count: number;
  plusCount: () => void;
  minusCount: () => void;
};

export const CounterContext = createContext<CounterContextProps>({
  count: 0,
  plusCount: () => {},
  minusCount: () => {},
});
