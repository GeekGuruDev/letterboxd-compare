import RatedMovieCard from "./RatedMovieCard";
import { ScrollArea } from "./ui/scroll-area";
import ListDialog from "./ListDialog";
import ListWrapper from "./ListWrapper";
import { CommonMovie } from "./MoviesCompare";

interface MoviesListProps {
  children: string;
  moviesList: CommonMovie[];
}

function RatedMoviesList({ children, moviesList }: MoviesListProps) {
  const limitedMoviesList =
    moviesList.length > 6 ? moviesList.slice(0, 6) : moviesList;
  return (
    <ListWrapper heading={children} moviesCount={moviesList.length}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4 sm:gap-y-8">
        {limitedMoviesList.map((movie) => (
          <RatedMovieCard key={movie.slug} ratedMovie={movie} />
        ))}
      </div>
      {moviesList.length > 6 && (
        <ListDialog heading={children} moviesCount={moviesList.length}>
          <ScrollArea className="h-[calc(100dvh-12rem)] md:max-h-120 rounded-b-sm">
            <div className="p-2 lg:pr-4 pb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4 sm:gap-y-8">
              {moviesList.map((movie) => (
                <RatedMovieCard key={movie.slug} ratedMovie={movie} />
              ))}
            </div>
          </ScrollArea>
        </ListDialog>
      )}
    </ListWrapper>
  );
}
export default RatedMoviesList;
