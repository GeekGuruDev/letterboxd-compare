import { useSearchParams } from "react-router";
import Logo from "../Logo";
import useFetchUser from "@/hooks/useFetchUser";
import ProfileComparison from "../ProfileComparison";
import MatchingScoreSection from "../MatchingScoreSection";
import { Skeleton } from "../ui/skeleton";
import SpinningLoader from "../SpinningLoader";
import BackHomeButton from "../BackHomeButton";
import MoviesList from "../MoviesList";
import RatedMoviesList from "../RatedMoviesList";
import ShareLink from "../ShareLink ";

export type Profile = {
  username: string;
  displayName: string;
  avatar: string;
  moviesStat: number;
};

export type Movie = {
  title: string;
  slug: string;
  rate: number | null;
  rateStars: string | null;
  liked: boolean;
};

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

function ComparePage() {
  const [searchParams] = useSearchParams();
  const username1 = searchParams.get("user1") || "";
  const username2 = searchParams.get("user2") || "";

  const link = `https://letterboxdcompare.netlify.app/compare?user1=${username1}&user2=${username2}/`;

  const {
    data: profileData1,
    loading: profileLoading1,
    error: err1,
  } = useFetchUser<Profile>(username1, "profile");
  const {
    data: profileData2,
    loading: profileLoading2,
    error: err2,
  } = useFetchUser<Profile>(username2, "profile");
  const { displayName: name1, moviesStat: moviesStat1 } = profileData1 ?? {
    displayName: "",
    moviesStat: 0,
  };
  const { displayName: name2, moviesStat: moviesStat2 } = profileData2 ?? {
    displayName: "",
    moviesStat: 0,
  };

  const isProfilesLoaded = profileData1 !== null && profileData2 !== null;

  const {
    data: moviesData1,
    loading: loadingMovies1,
    error: moviesErr1,
  } = useFetchUser<Movie[]>(username1, "movies", isProfilesLoaded);
  const {
    data: moviesData2,
    loading: loadingMovies2,
    error: moviesErr2,
  } = useFetchUser<Movie[]>(username2, "movies", isProfilesLoaded);
  const isMoviesLoaded = moviesData1 !== null && moviesData2 !== null;

  const { data: watchlistData1, loading: watchlistLoading1 } = useFetchUser<
    Movie[]
  >(username1, "watchlist", isMoviesLoaded);
  const { data: watchlistData2, loading: watchlistLoading2 } = useFetchUser<
    Movie[]
  >(username2, "watchlist", isMoviesLoaded);

  const isWatchlistLoading = watchlistLoading1 || watchlistLoading2;

  const commonMovies: CommonMovie[] = [];
  const moviesData2Map = new Map(moviesData2?.map((item) => [item.slug, item]));

  moviesData1?.forEach((item1) => {
    const item2 = moviesData2Map.get(item1.slug);
    if (item2) {
      commonMovies.push({
        title: item1.title,
        slug: item1.slug,
        user1: {
          name: name1,
          rate: item1.rate,
          rateStars: item1.rateStars,
          liked: item1.liked,
        },
        user2: {
          name: name2,
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

  const commonWatchlistMovies = watchlistData1?.filter((movie) => {
    return watchlistData2?.some((item) => item.slug === movie.slug);
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
    <div className="py-8 min-h-screen">
      <BackHomeButton />
      <header className="my-8">
        <Logo />
      </header>
      <main className="max-w-4xl p-4 mb-16 mx-auto">
        <ProfileComparison
          profileLoading1={profileLoading1}
          profileLoading2={profileLoading2}
          profileErr1={err1}
          profileErr2={err2}
          profileData1={profileData1}
          profileData2={profileData2}
          loadingMovies1={loadingMovies1}
          loadingMovies2={loadingMovies2}
          moviesData1={moviesData1}
          moviesData2={moviesData2}
          moviesStat1={moviesStat1}
          moviesStat2={moviesStat2}
          moviesErr1={moviesErr1}
          moviesErr2={moviesErr2}
        />
        {isProfilesLoaded && !isMoviesLoaded && (
          <section className="mt-16">
            <div className="text-center">
              <h1 className="text-4xl text-center leading-relaxed text-muted-foreground">
                Matching Score
              </h1>
              <Skeleton className="w-[200px] h-[60px] mx-auto" />
            </div>
            <p className="mt-16 text-lg tracking-wide text-muted-foreground text-center">
              Collection movies data...
            </p>
            <SpinningLoader size={48} className="mx-auto" />
          </section>
        )}
        {isProfilesLoaded && isMoviesLoaded && (
          <>
            <MatchingScoreSection
              moviesStat1={moviesStat1}
              moviesStat2={moviesStat2}
              name1={name1}
              name2={name2}
              commonMovies={commonMovies}
            />

            <MoviesList moviesList={commonMovies}>
              Common Watched Movies
            </MoviesList>

            <MoviesList moviesList={commonLikedMovies}>
              Common Liked Movies
            </MoviesList>

            {isWatchlistLoading && (
              <SpinningLoader size={48} className="mx-auto" />
            )}
            {commonWatchlistMovies && (
              <>
                <MoviesList moviesList={commonWatchlistMovies}>
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
        )}
      </main>
    </div>
  );
}

export default ComparePage;
