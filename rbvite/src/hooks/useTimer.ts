/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef } from 'react';

export const useDebounce = <
  T extends (...args: Parameters<T>) => ReturnType<T>
>(
  cb: T,
  delay: number,
  depArr: unknown[],
  ...args: Parameters<T>
) => {
  const { reset } = useTimeout(() => cb(...args), delay, depArr);
  useEffect(() => {
    reset();
  }, depArr);
};

export const useThrottle = <
  T extends (...args: Parameters<T>) => ReturnType<T>
>(
  cb: T,
  delay: number,
  depArr: unknown[],
  ...args: Parameters<T>
) => {
  const { ref } = useTimeout(() => cb(...args), delay, depArr);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(ref);

  useEffect(() => {
    console.log('****>>', timerRef.current);
    if (timerRef.current) return;

    timerRef.current = setTimeout(() => {
      cb(...args);
      timerRef.current = undefined;
    }, delay);
  }, depArr);
};

export const useTimeout = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  cb: T,
  delay: number,
  depArr: unknown[] = [],
  ...args: Parameters<T>
) => {
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const setTheTimer = useCallback(() => {
    timerRef.current = setTimeout(() => {
      console.log('🚀 args:', args);
      cb(...args);
    }, delay);
  }, depArr);

  const clear = useCallback(() => clearTimeout(timerRef.current), depArr);

  const reset = useCallback(() => {
    clear();
    setTheTimer();
  }, depArr);

  useEffect(() => {
    setTheTimer();

    return clear;
  }, [cb, delay, ...args]);

  return { reset, clear, ref: timerRef.current };
};

export const useInterval = <
  T extends (...args: Parameters<T>) => ReturnType<T>
>(
  cb: T,
  delay: number,
  ...args: Parameters<T>
) => {
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);
  console.log('SET-INTERVAL', timerRef.current, delay);

  const clear = useCallback(() => {
    console.log('Clear!!', timerRef.current, delay);
    clearInterval(timerRef.current);
  }, []);

  const setTheTimer = useCallback(() => {
    timerRef.current = setInterval(() => cb(...args), delay);
    console.log('**************', timerRef.current, delay);
  }, []);

  useEffect(() => {
    setTheTimer();

    return clear;
  }, [delay, ...args]);

  const reset = useCallback(() => {
    console.log('RESET!!', timerRef.current, delay);
    clear();
    setTheTimer();
  }, []);

  return { reset, clear };
};

// old
export const useTimeoutOld = <T extends unknown[]>(
  cb: (...args: T) => void,
  delay: number,
  ...args: T
) => {
  console.log('🚀 Timeout.args:', args);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const clear = () => clearTimeout(timerRef.current);

  useEffect(() => {
    timerRef.current = setTimeout(cb, delay, ...args);

    return clear;
  }, [delay, ...args]);

  const reset = () => {
    clear();
    timerRef.current = setTimeout(cb, delay, ...args);
  };

  return { reset, clear };
};
