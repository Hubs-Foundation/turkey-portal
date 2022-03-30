import { useEffect, useState } from "react";

export function useQuery(url, transform) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(async () => {
    try {
      const result = await fetch(url).then((r) => r.json());
      setData(transform ? transform(result) : result);
    } catch(e) {
      console.error(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {data, setData, loading, error};
}

export function useMutation(url) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (data) => {
    try {
      setLoading(true);
      await fetch(url, {
        headers: { "content-type": "application/json" },
        method: "PATCH",
        body: JSON.stringify({ data }),
      })
    } catch(e) {
      console.error(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return {mutate, loading, error};
}
