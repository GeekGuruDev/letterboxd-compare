import AverageRating from "./AverageRating";
import SpinningLoader from "./SpinningLoader";
import MoviesList from "./MoviesList";
import RatedMoviesList from "./RatedMoviesList";
import useMovies from "@/hooks/useMovies";
import useWatchlist from "@/hooks/useWatchlist";
import MatchingScore from "./MatchingScore";
import VennDiagram from "./VennDiagram";
import CommonMoviesCounter from "./CommonMoviesCounter";
import { Profile, Movie } from "./pages/ComparePage";
import ShareLink from "./ShareLink ";
import { useSearchParams } from "react-router";
import { Separator } from "./ui/separator";
import useReviews from "@/hooks/useReviews";
import ReviewsList from "./ReviewsList";

export type CommonMovie = {
  title: string;
  slug: string;
  user1: {
    name: string;
    rate: number | null;
    rateStars: string | null;
    liked: boolean;
  };
  user2: {
    name: string;
    rate: number | null;
    rateStars: string | null;
    liked: boolean;
  };
};

export type UserReview = {
  name: string;
  watchedDate: string;
  liked: boolean;
  rate: number | null;
  rateStars: string | null;
  review: string;
};

export type CommonReview = {
  title: string;
  slug: string;
  releaseYear: string;
  user1: UserReview;
  user2: UserReview;
};

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
  const isWatchlistSuccess = !!(watchlist1 && watchlist2);

  const {
    reviews: reviews1,
    isPending: isReviewLoading1,
    // isError: isReviewError1,
  } = useReviews("user1", isWatchlistSuccess);

  const {
    reviews: reviews2,
    isPending: isReviewLoading2,
    // isError: isReviewError2,
  } = useReviews("user2", isWatchlistSuccess);

  const isReviewsLoading = isReviewLoading1 || isReviewLoading2;

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

  const liked1 = movies1?.filter((movie) => movie.liked);
  const liked2 = movies2?.filter((movie) => movie.liked);

  const likedByUser1NotWatchedByUser2 = liked1?.filter((movie) => {
    return !movies2?.some((item) => item.slug === movie.slug);
  });

  const likedByUser2NotWatchedByUser1 = liked2?.filter((movie) => {
    return !movies1?.some((item) => item.slug === movie.slug);
  });

  const commonReviews: CommonReview[] = [];
  const reviews2Map = new Map(reviews2?.map((item) => [item.slug, item]));

  reviews1?.forEach((item1) => {
    const item2 = reviews2Map.get(item1.slug);
    if (item2) {
      commonReviews.push({
        title: item1.title,
        slug: item1.slug,
        releaseYear: item1.releaseYear,
        user1: {
          name: profile1.displayName,
          watchedDate: item1.watchedDate,
          liked: item1.liked,
          rate: item1.rate,
          rateStars: item1.rateStars,
          review: item1.review,
        },
        user2: {
          name: profile2.displayName,
          watchedDate: item2.watchedDate,
          liked: item2.liked,
          rate: item2.rate,
          rateStars: item2.rateStars,
          review: item2.review,
        },
      });
    }
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
          <MoviesList moviesList={likedByUser1NotWatchedByUser2 as Movie[]}>
            {`Liked by ${profile1.username} but not watched by ${profile2.username}`}
          </MoviesList>
          <MoviesList moviesList={likedByUser2NotWatchedByUser1 as Movie[]}>
            {`Liked by ${profile2.username} but not watched by ${profile1.username}`}
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

          <ReviewsList reviewsList={commonReviews} isLoading={isReviewsLoading}>
            Common Reviews
          </ReviewsList>

          <ShareLink link={link} />
        </>
      )}
    </>
  );
}
export default MoviesCompare;
