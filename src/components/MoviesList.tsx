import MovieCard from "./MovieCard";
import SpinningLoader from "./SpinningLoader";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";

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
    <section className="mt-16">
      <h1 className="font-semibold text-xl md:text-2xl text-muted-foreground">
        {children}
      </h1>
      <p className="ml-0.5 text-muted-foreground my-2">
        {moviesList.length} movies
      </p>
      <div className="bg-muted rounded-sm py-4 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-y-8">
        {moviesList.length === 0 && (
          <p className="col-span-4 sm:col-span-6 md:col-span-8 p-4 text-center text-muted-foreground">
            No {children.toLowerCase()}
          </p>
        )}
        {limitedMoviesList.map((movie) => (
          <MovieCard key={movie.slug} slug={movie.slug} />
        ))}
      </div>
      {moviesList.length > 24 && (
        <Dialog>
          <div className="flex justify-center">
            <DialogTrigger asChild className="flex justify-center">
              <Button variant="outline" className="my-4 cursor-pointer">
                See All
              </Button>
            </DialogTrigger>
          </div>
          <DialogContent className="block sm:max-w-[calc(100%-2rem)] lg:max-w-4xl px-0 pb-0">
            <DialogHeader className="px-4 block text-left">
              <DialogTitle className="mr-4 text-xl md:text-2xl text-muted-foreground">
                {children}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground my-2 ml-0.5">
                {moviesList.length} movies
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[calc(100dvh-12rem)]  md:max-h-120 rounded-b-sm bg-muted">
              <div className="py-4 px-2 pb-8 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-x-4 gap-y-8">
                {moviesList.map((movie) => (
                  <MovieCard key={movie.slug} slug={movie.slug} />
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
export default MoviesList;
