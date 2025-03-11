import useFetchMovie from "@/hooks/useFetchMovie";
import { CommonMovie } from "./pages/ComparePage";
import { Card, CardContent } from "./ui/card";
import UserRating from "./UserRating";
import { Skeleton } from "./ui/skeleton";

function RatedMovieCard({ ratedMovie }: { ratedMovie: CommonMovie }) {
  const { movie, loading } = useFetchMovie(ratedMovie.slug);
  return (
    <Card className="p-0 rounded-md bg-muted">
      <CardContent className="p-0 flex">
        {loading && (
          <>
            <Skeleton className="w-[70px] h-[105px] rounded-r-none" />
            <div className="flex-1 flex flex-col">
              <Skeleton className="w-[80px] h-[16px] my-2 self-center" />
              <div className="flex flex-1 justify-evenly">
                <div className="flex flex-col items-center">
                  <Skeleton className="w-[80px] h-[16px] my-0.5" />
                  <Skeleton className="w-[40px] h-[24px] my-0.5" />
                  <Skeleton className="w-[60px] h-[16px] my-1" />
                </div>
                <div className="flex flex-col items-center">
                  <Skeleton className="w-[80px] h-[16px] my-0.5" />
                  <Skeleton className="w-[40px] h-[24px] my-0.5" />
                  <Skeleton className="w-[60px] h-[16px] my-1" />
                </div>{" "}
              </div>
            </div>
          </>
        )}
        {movie && (
          <>
            <a
              href={`https://letterboxd.com/film/${ratedMovie.slug}/`}
              target="_blank"
            >
              <div className="w-[70px] h-[105px] overflow-hidden">
                <img
                  className="w-[72px] rounded-l-md object-cover"
                  src={movie.poster}
                  alt={movie.title}
                />
              </div>
            </a>
            <div className="flex-1">
              <p className="text-center my-2 px-2 text-xs tracking-wide line-clamp-1">
                {movie.title}
              </p>
              <div className="flex justify-evenly">
                <UserRating
                  name={ratedMovie.user1.name}
                  rate={ratedMovie.user1.rate}
                  rateStars={ratedMovie.user1.rateStars}
                />
                <UserRating
                  name={ratedMovie.user2.name}
                  rate={ratedMovie.user2.rate}
                  rateStars={ratedMovie.user2.rateStars}
                />
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default RatedMovieCard;
