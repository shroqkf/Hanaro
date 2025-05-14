// cleanup을 자동으로 해주는 useTimeout 커스텀 훅을 작성하시오.
// useInterval까지
import { useEffect } from "react";

export const useTimeout = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  cb: T,
  delay: number,
  ...args: Parameters<T>
) => {
  useEffect(() => {
    const timer = setTimeout(cb, delay, ...args);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, ...args]);
};

export const useInterval = <
  T extends (...args: Parameters<T>) => ReturnType<T>
>(
  cb: T,
  delay: number,
  ...args: Parameters<T>
) => {
  useEffect(() => {
    const timer = setInterval(cb, delay, ...args);

    return () => clearInterval(timer);
  }, [cb, delay, args]);
};
