import ProfileDetails from "./ProfileDetails";
import ProfileLoader from "./ProfileLoader";
import { Skeleton } from "./ui/skeleton";
import WatchedMore from "./WatchedMore";
import AvgRatingLoader from "./AvgRatingLoader";
import AverageRating from "./AverageRating";
import { Movie, Profile } from "./pages/ComparePage";
import { Separator } from "./ui/separator";
import { useSearchParams } from "react-router";
import ProfileError from "./ProfileError";

interface ProfileComparisonProps {
  profileLoading1: boolean;
  profileLoading2: boolean;
  profileData1?: Profile | null;
  profileData2?: Profile | null;
  loadingMovies1: boolean;
  loadingMovies2: boolean;
  moviesData1?: Movie[] | null;
  moviesData2?: Movie[] | null;
  moviesStat1: number;
  moviesStat2: number;
  profileErr1: Error | null;
  profileErr2: Error | null;
  moviesErr1: Error | null;
  moviesErr2: Error | null;
}

function ProfileComparison({
  profileLoading1,
  profileLoading2,
  profileData1,
  profileData2,
  loadingMovies1,
  loadingMovies2,
  moviesData1,
  moviesData2,
  moviesStat1,
  moviesStat2,
  profileErr1,
  profileErr2,
  moviesErr1,
  moviesErr2,
}: ProfileComparisonProps) {
  const [searchParams] = useSearchParams();
  const username1 = searchParams.get("user1") || "";
  const username2 = searchParams.get("user2") || "";

  return (
    <section>
      <div className="flex justify-center gap-2">
        {profileLoading1 && <ProfileLoader />}
        {profileErr1 && <ProfileError username={username1} id="user1" />}
        {profileData1 && <ProfileDetails data={profileData1} />}
        <Separator orientation="vertical" />
        {profileLoading2 && <ProfileLoader />}
        {profileErr2 && <ProfileError username={username2} id="user2" />}
        {profileData2 && <ProfileDetails data={profileData2} />}
      </div>
      {(profileLoading1 || profileLoading2) && (
        <div className="my-16 flex flex-col items-center gap-1">
          <Skeleton className="w-[300px] h-[30px]" />
          <Skeleton className="sm:hidden w-[100px] h-[30px]" />
        </div>
      )}

      {profileData1 && profileData2 && (
        <WatchedMore
          name1={profileData1.displayName}
          name2={profileData2.displayName}
          moviesStat1={moviesStat1}
          moviesStat2={moviesStat2}
        />
      )}
      <div className="text-center flex justify-evenly gap-4">
        {loadingMovies1 && <AvgRatingLoader />}
        {moviesErr1 && (
          <div className="flex-1">
            <p className="text-destructive-foreground text-center">
              Error fetching {profileData1?.displayName} movies details
            </p>
          </div>
        )}
        {profileData1 && !loadingMovies1 && moviesData1?.length && (
          <AverageRating
            name={profileData1.displayName}
            moviesData={moviesData1}
          />
        )}
        <Separator orientation="vertical" />
        {loadingMovies2 && <AvgRatingLoader />}
        {moviesErr2 && (
          <div className="flex-1">
            <p className="text-destructive-foreground text-center">
              Error fetching {profileData2?.displayName} movies details. Try
              again
            </p>
          </div>
        )}
        {profileData2 && !loadingMovies2 && moviesData2?.length && (
          <AverageRating
            name={profileData2.displayName}
            moviesData={moviesData2}
          />
        )}
      </div>
    </section>
  );
}

export default ProfileComparison;
