import AverageRating from "./AverageRating";
import SpinningLoader from "./SpinningLoader";
import MoviesList from "./MoviesList";
import RatedMoviesList from "./RatedMoviesList";
import useMovies from "@/hooks/useMovies";
import useWatchlist from "@/hooks/useWatchlist";
import MatchingScore from "./MatchingScore";
import VennDiagram from "./VennDiagram";
import CommonMoviesCounter from "./CommonMoviesCounter";
import { Profile, Movie, CommonMovie } from "./pages/ComparePage";
import ShareLink from "./ShareLink ";
import { useSearchParams } from "react-router";
import { Separator } from "./ui/separator";

interface MoviesCompareProps {
  profile1: Profile;
  profile2: Profile;
}

function MoviesCompare({ profile1, profile2 }: MoviesCompareProps) {
  const [searchParams] = useSearchParams();
  const username1 = searchParams.get("user1") || "";
  const username2 = searchParams.get("user2") || "";

  const link = `https://letterboxdcompare.netlify.app/compare?user1=${username1}&user2=${username2}`;

  const {
    movies: movies1,
    isPending: isMoviesLoading1,
    isError: isMoviesError1,
    // refetch: refetchMovies1,
  } = useMovies("user1");

  const {
    movies: movies2,
    isPending: isMoviesLoading2,
    isError: isMoviesError2,
    // refetch: refetchMovies2,
  } = useMovies("user2");

  const isMoviesLoading = isMoviesLoading1 || isMoviesLoading2;
  const isMoviesError = isMoviesError1 || isMoviesError2;
  const isMoviesSuccess = !!(movies1 && movies2);

  const {
    watchlist: watchlist1,
    isPending: isWatchlistLoading1,
    // isError: isWatchlistError1,
  } = useWatchlist("user1", isMoviesSuccess);

  const {
    watchlist: watchlist2,
    isPending: isWatchlistLoading2,
    // isError: isWatchlistError2,
  } = useWatchlist("user2", isMoviesSuccess);

  const isWatchlistLoading = isWatchlistLoading1 || isWatchlistLoading2;

  const commonMovies: CommonMovie[] = [];
  const movies2Map = new Map(movies2?.map((item) => [item.slug, item]));

  movies1?.forEach((item1) => {
    const item2 = movies2Map.get(item1.slug);
    if (item2) {
      commonMovies.push({
        title: item1.title,
        slug: item1.slug,
        user1: {
          name: profile1.displayName,
          rate: item1.rate,
          rateStars: item1.rateStars,
          liked: item1.liked,
        },
        user2: {
          name: profile2.displayName,
          rate: item2.rate,
          rateStars: item2.rateStars,
          liked: item2.liked,
        },
      });
    }
  });

  const commonLikedMovies = commonMovies.filter(
    (movie) => movie.user1.liked && movie.user2.liked
  );

  let commonWatchlistMovies: Movie[] = [];
  if (watchlist1 && watchlist2)
    commonWatchlistMovies = watchlist1?.filter((movie) => {
      return watchlist2?.some((item) => item.slug === movie.slug);
    });

  const similarRatedMovies = commonMovies.filter((movie) => {
    if (!movie.user1.rate || !movie.user2.rate) return false;
    return Math.abs(movie.user1.rate - movie.user2.rate) < 1;
  });

  const dissimilarRatedMovies = commonMovies.filter((movie) => {
    if (!movie.user1.rate || !movie.user2.rate) return false;
    return Math.abs(movie.user1.rate - movie.user2.rate) > 1;
  });

  return (
    <>
      <section className="text-center flex justify-evenly gap-4">
        <AverageRating
          name={profile1.displayName}
          movies={movies1}
          isLoading={isMoviesLoading1}
          isError={isMoviesError1}
        />
        <Separator orientation="vertical" />
        <AverageRating
          name={profile2.displayName}
          movies={movies2}
          isLoading={isMoviesLoading2}
          isError={isMoviesError2}
        />
      </section>

      <section className="mt-16">
        {!isMoviesError && (
          <MatchingScore
            commonMoviesCount={commonMovies.length}
            moviesCount1={profile1.moviesCount}
            moviesCount2={profile2.moviesCount}
            isLoading={isMoviesLoading}
          />
        )}
        {isMoviesLoading && (
          <>
            <p className="mt-16 text-lg tracking-wide text-muted-foreground text-center">
              Collecting movies data...
            </p>
            <SpinningLoader size={48} className="mx-auto" />
          </>
        )}
        {isMoviesSuccess && (
          <>
            <VennDiagram
              user1={profile1}
              user2={profile2}
              commonMoviesCount={commonMovies.length}
            />

            <CommonMoviesCounter
              commonMoviesCount={commonMovies.length}
              user1={profile1}
              user2={profile2}
            />
          </>
        )}
      </section>

      {isMoviesSuccess && (
        <>
          <MoviesList moviesList={commonMovies}>
            Common Watched Movies
          </MoviesList>
          <MoviesList moviesList={commonLikedMovies}>
            Common Liked Movies
          </MoviesList>

          <MoviesList
            moviesList={commonWatchlistMovies}
            isLoading={isWatchlistLoading}
          >
            Common Watchlist
          </MoviesList>

          <RatedMoviesList moviesList={similarRatedMovies}>
            Similar Rated Movies
          </RatedMoviesList>
          <RatedMoviesList moviesList={dissimilarRatedMovies}>
            Dissimilar Rated Movies
          </RatedMoviesList>
          <ShareLink link={link} />
        </>
      )}
    </>
  );
}
export default MoviesCompare;
