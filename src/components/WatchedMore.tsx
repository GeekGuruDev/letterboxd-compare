import { Profile } from "./pages/ComparePage";
import { Skeleton } from "./ui/skeleton";

interface WatchedMoreProps {
  profile1: Profile;
  profile2: Profile;
  isLoading: boolean;
}

function WatchedMore({ profile1, profile2, isLoading }: WatchedMoreProps) {
  if (isLoading) {
    return (
      <div className="my-16 flex flex-col items-center gap-1">
        <Skeleton className="w-[300px] h-[30px]" />
        <Skeleton className="sm:hidden w-[100px] h-[30px]" />
      </div>
    );
  }

  const { moviesCount: moviesCount1, displayName: name1 } = profile1;
  const { moviesCount: moviesCount2, displayName: name2 } = profile2;
  return (
    <h4 className="text-center text-2xl my-16">
      <span className="font-bold">
        {moviesCount1 >= moviesCount2 ? name1 : name2}
      </span>{" "}
      watched{" "}
      <span className="font-bold text-blue-500">
        {Math.abs(moviesCount1 - moviesCount2)}
      </span>{" "}
      more movies
    </h4>
  );
}
export default WatchedMore;
