import { useEffect, useState } from "react";

export function useQuery(url, transform) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(async () => {
    try {
      const result = await fetch(url).then((r) => r.json());
      setData(transform ? transform(result) : result);
      setSuccess(true);
    } catch(e) {
      console.error(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {data, setData, loading, error, success};
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
