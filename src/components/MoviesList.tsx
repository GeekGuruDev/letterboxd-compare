import MovieCard from "./MovieCard";
import SpinningLoader from "./SpinningLoader";
import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";
import ListDialog from "./ListDialog";
import ListWrapper from "./ListWrapper";

interface MoviesListProps<T> {
  moviesList: T[];
  isLoading?: boolean;
  children: string;
}

function MoviesList<T extends { slug: string }>({
  moviesList,
  isLoading = false,
  children,
}: MoviesListProps<T>) {
  const limitedMoviesList =
    moviesList.length > 24 ? moviesList.slice(0, 24) : moviesList;

  if (isLoading) {
    return (
      <section className="mt-16">
        <h1 className="font-semibold text-xl md:text-xl text-muted-foreground">
          {children}
        </h1>
        <Skeleton className="w-[64px] h-[24px] my-2" />
        <div className="bg-muted rounded-sm py-4">
          <SpinningLoader size={48} className="mx-auto" />
        </div>
      </section>
    );
  }

  return (
    <ListWrapper heading={children} moviesCount={moviesList.length}>
      <div className="bg-muted rounded-sm py-4 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-y-8">
        {limitedMoviesList.map((movie) => (
          <MovieCard key={movie.slug} slug={movie.slug} />
        ))}
      </div>
      {moviesList.length > 24 && (
        <ListDialog heading={children} moviesCount={moviesList.length}>
          <ScrollArea className="h-[calc(100dvh-12rem)]  md:max-h-120 rounded-b-sm bg-muted">
            <div className="py-4 px-2 pb-8 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-x-4 gap-y-8">
              {moviesList.map((movie) => (
                <MovieCard key={movie.slug} slug={movie.slug} />
              ))}
            </div>
          </ScrollArea>
        </ListDialog>
      )}
    </ListWrapper>
  );
}
export default MoviesList;
