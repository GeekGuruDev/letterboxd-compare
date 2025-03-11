import { useEffect, useState } from "react";

const API_URL = "https://letterboxd-compare-api.onrender.com";

interface Movie {
  title: string;
  poster: string;
}

function useFetchMovie(slug: string) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/movie/${slug}`);
        const json = await response.json();
        if (json.status !== "success") {
          throw new Error(json.message);
        }
        setMovie(json.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  return { movie, loading };
}
export default useFetchMovie;
