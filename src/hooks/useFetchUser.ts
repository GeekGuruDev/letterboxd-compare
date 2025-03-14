import { useEffect, useState } from "react";

const API_URL = "https://letterboxd-compare-api.onrender.com";
// const API_URL = "http://localhost:3000";

type Type = "profile" | "movies" | "watchlist";

interface FetchDataResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

function useFetchUser<T>(
  username: string,
  type: Type,
  condition = true
): FetchDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/${type}/${username}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setData(json.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unknown error occurred."));
        }
      } finally {
        setLoading(false);
      }
    }

    if (condition) fetchData();
  }, [username, type, condition]);

  return { data, loading, error };
}
export default useFetchUser;
