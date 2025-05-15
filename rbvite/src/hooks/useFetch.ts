import { useLayoutEffect, useState } from "react";
import { toErrorWithMessage } from "../utils/error";

export const useFetch = <T>(url: string, depArr: unknown[] = []) => {
  const [data, setData] = useState<T>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useLayoutEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetch(url)
      .then((res) => {
        console.log("res: ", res);
        if (!res.ok) return res.json();
      })
      // .then(setData)
      .then(setData)
      .catch((err) => {
        console.log(err);
        if (!signal.aborted) setError(toErrorWithMessage(err).message);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, depArr);

  return { data, isLoading, error };
};
