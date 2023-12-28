import { useState, useCallback } from "react";

export const useHttp = () => {
  const [process, setProcess] = useState("pending");

  const request = useCallback(async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Data was not received");
      }
      return await response.json();
    } catch (e) {
      setProcess("error");
      console.error(e);
      throw e;
    }
  }, []);

  const changeError = useCallback(() => {
    setProcess("loading");
  }, []);

  return {
    process,
    setProcess,
    request,
    changeError,
  };
};
