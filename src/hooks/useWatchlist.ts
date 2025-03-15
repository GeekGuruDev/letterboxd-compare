import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { API_URL, Movie, UserKey } from "@/components/pages/ComparePage";

async function getMovies(username: string): Promise<Movie[]> {
  const response = await fetch(`${API_URL}/watchlist/${username}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const json = await response.json();
  return json.data;
}

function useWatchlist(userKey: UserKey, isEnabled: boolean) {
  const [searchParams] = useSearchParams();
  const username: string = searchParams.get(userKey) || "";

  const {
    data: watchlist,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["watchlist", username],
    queryFn: () => getMovies(username),
    enabled: isEnabled,
  });

  return { watchlist, isPending, isError, refetch };
}
export default useWatchlist;
