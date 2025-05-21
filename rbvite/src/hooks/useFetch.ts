import { useLayoutEffect, useState } from 'react';
import { toErrorWithMessage } from '../utils/error-utils';

export const useFetch = <T>(url: string, depArr: unknown[] = []) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  useLayoutEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    setLoading(true);
    fetch(url, { signal })
      .then(res => {
        // console.log('🚀 res:', res);
        if (!res.ok) {
          setError(`${res.status} ${res.statusText || 'Error'}`);
        } else {
          return res.json();
        }
      })
      .then(setData)
      .catch(err => {
        if (!signal.aborted) setError(toErrorWithMessage(err).message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, depArr);

  return { data, error, isLoading };
};
