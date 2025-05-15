// cleanup을 자동으로 해주는 useTimeout 커스텀 훅을 작성하시오.
// useInterval까지
import { useEffect, useRef } from "react";

export const useTimeout = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  cb: T,
  delay: number,
  ...args: Parameters<T>
) => {
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const setTheTimer = () => {
    timerRef.current = setTimeout(() => cb(...args), delay);
  };
  const clear = () => clearTimeout(timerRef.current);
  const reset = () => {
    clear();
    setTheTimer();
  };

  useEffect(() => {
    setTheTimer();
    return clear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, ...args]);
  //   }, [cb, delay, ...args]); // TODO

  return { reset, clear };
};

export const useInterval = <
  T extends (...args: Parameters<T>) => ReturnType<T>
>(
  cb: T,
  delay: number,
  ...args: Parameters<T>
) => {
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const setTheTimer = () => {
    timerRef.current = setTimeout(cb, delay, ...args);
  };
  const clear = () => clearTimeout(timerRef.current);
  const reset = () => {
    clear();
    setTheTimer();
    console.log("Reset", timerRef.current);
  };

  useEffect(() => {
    setTheTimer();
    return clear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, ...args]);

  return { reset, clear };
};
