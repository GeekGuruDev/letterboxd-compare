import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { API_URL, UserKey } from "@/components/pages/ComparePage";

type Review = {
  title: string;
  slug: string;
  watchedDate: string;
  releaseYear: string;
  liked: boolean;
  rate: number | null;
  rateStars: string | null;
  review: string;
};

async function getReviews(username: string): Promise<Review[]> {
  const response = await fetch(`${API_URL}/reviews/${username}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const json = await response.json();
  return json.data;
}

function useReviews(userKey: UserKey, isEnabled: boolean) {
  const [searchParams] = useSearchParams();
  const username = searchParams.get(userKey) || "";

  const {
    data: reviews,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["reviews", username],
    queryFn: () => getReviews(username),
    enabled: isEnabled,
  });

  return { reviews, isPending, isError, refetch };
}
export default useReviews;
