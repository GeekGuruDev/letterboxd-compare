import ProfileDetails from "./ProfileDetails";
import ProfileLoader from "./ProfileLoader";
import { Skeleton } from "./ui/skeleton";
import WatchedMore from "./WatchedMore";
import AvgRatingLoader from "./AvgRatingLoader";
import AverageRating from "./AverageRating";
import { Movie, Profile } from "./pages/ComparePage";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useSearchParams } from "react-router";

interface ProfileComparisonProps {
  loadingProfile1: boolean;
  loadingProfile2: boolean;
  profileData1?: Profile | null;
  profileData2?: Profile | null;
  loadingMovies1: boolean;
  loadingMovies2: boolean;
  moviesData1?: Movie[] | null;
  moviesData2?: Movie[] | null;
  moviesStat1: number;
  moviesStat2: number;
  err1: Error | null;
  err2: Error | null;
}

function ProfileComparison({
  loadingProfile1,
  loadingProfile2,
  profileData1,
  profileData2,
  loadingMovies1,
  loadingMovies2,
  moviesData1,
  moviesData2,
  moviesStat1,
  moviesStat2,
  err1,
  err2,
}: ProfileComparisonProps) {
  const [searchParams] = useSearchParams();
  const username1 = searchParams.get("user1") || "";
  const username2 = searchParams.get("user2") || "";

  return (
    <section>
      <div className="flex justify-center gap-2">
        {loadingProfile1 && <ProfileLoader />}
        {err1 && (
          <div className="py-16 flex-1 flex flex-col justify-center gap-8 text-center text-muted-foreground">
            <h1 className="text-lg md:text-2xl">
              Username:{" "}
              <span className="text-foreground font-semibold">{username1}</span>{" "}
              not found.
            </h1>
            <p className="mx-8">Please enter correct username and try again.</p>
            <div>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Try again
              </Button>
            </div>
          </div>
        )}
        {profileData1 && <ProfileDetails data={profileData1} />}
        <Separator orientation="vertical" />
        {loadingProfile2 && <ProfileLoader />}
        {err2 && (
          <div className="py-16 flex-1 flex flex-col justify-center gap-8 text-center text-muted-foreground">
            <h1 className="text-lg md:text-2xl">
              Username:{" "}
              <span className="text-foreground font-semibold">{username2}</span>{" "}
              not found.
            </h1>
            <p className="mx-8">Please enter correct username and try again.</p>
            <div>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Try again
              </Button>
            </div>
          </div>
        )}
        {profileData2 && <ProfileDetails data={profileData2} />}
      </div>
      {(loadingProfile1 || loadingProfile2) && (
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
        {!loadingMovies1 && profileData1 && moviesData1?.length && (
          <AverageRating
            name={profileData1.displayName}
            moviesData={moviesData1}
          />
        )}
        <Separator orientation="vertical" />
        {loadingMovies2 && <AvgRatingLoader />}
        {!loadingMovies2 && profileData2 && moviesData2?.length && (
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
