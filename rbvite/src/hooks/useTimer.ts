/* eslint-disable react-hooks/exhaustive-deps */
// cleanup을 자동으로 해주는 useTimeout 커스텀 훅을 작성하시오.
// useInterval까지
import { useCallback, useEffect, useRef } from "react";

export const useTimeout = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  cb: T,
  delay: number,
  ...args: Parameters<T>
) => {
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const setTheTimer = () => {
    timerRef.current = setTimeout(() => cb(...args), delay);
  };
  const clear = useCallback(() => clearTimeout(timerRef.current), []);
  const reset = useCallback(() => {
    console.log("Reset", timerRef.current, delay);

    clear();
    setTheTimer();
  }, []);

  useEffect(() => {
    setTheTimer();
    return clear;
  }, [cb, delay, ...args]);

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
  const clear = useCallback(() => clearTimeout(timerRef.current), []);
  const reset = useCallback(() => {
    clear();
    setTheTimer();
    console.log("Reset", timerRef.current, delay);
  }, []);

  useEffect(() => {
    setTheTimer();
    return clear;
  }, [delay, ...args]);

  return { reset, clear };
};
