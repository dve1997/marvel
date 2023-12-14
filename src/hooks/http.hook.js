import { useState, useCallback } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const request = useCallback(async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Data was not received");
      }
      setLoading(false);
      return await response.json();
    } catch (e) {
      setLoading(false);
      setError(true);
      console.error(e);
      throw e;
    }
  }, []);

  const changeError = useCallback(() => {
    setError(false);
  }, []);

  return { loading, error, setLoading, request, changeError };
};
