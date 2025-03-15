import { API_URL, Profile, UserKey } from "@/components/pages/ComparePage";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

async function getProfile(username: string): Promise<Profile> {
  const response = await fetch(`${API_URL}/profile/${username}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const json = await response.json();
  return json.data;
}

function useProfile(userKey: UserKey) {
  const [searchParams] = useSearchParams();
  const username: string = searchParams.get(userKey) || "";

  const {
    data: profile,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["profile", username],
    queryFn: () => getProfile(username),
  });

  return { profile, isPending, isError };
}
export default useProfile;
