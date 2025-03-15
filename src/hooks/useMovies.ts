import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { API_URL, Movie, UserKey } from "@/components/pages/ComparePage";

async function getMovies(username: string): Promise<Movie[]> {
  const response = await fetch(`${API_URL}/movies/${username}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const json = await response.json();
  return json.data;
}

function useMovies(userKey: UserKey) {
  const [searchParams] = useSearchParams();
  const username: string = searchParams.get(userKey) || "";

  const {
    data: movies,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["movies", username],
    queryFn: () => getMovies(username),
  });

  return { movies, isPending, isError, refetch };
}
export default useMovies;
