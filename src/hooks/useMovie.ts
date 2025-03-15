import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/components/pages/ComparePage";

type Movie = {
  title: string;
  poster: string;
};

async function getMovie(slug: string): Promise<Movie> {
  const response = await fetch(`${API_URL}/movie/${slug}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const json = await response.json();
  return json.data;
}

function useMovie(slug: string) {
  const {
    data: movie,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["movie", slug],
    queryFn: () => getMovie(slug),
    staleTime: Infinity,
  });

  return { movie, isPending, isError };
}
export default useMovie;
