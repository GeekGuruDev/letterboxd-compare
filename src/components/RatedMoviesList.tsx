import { DialogTitle } from "@radix-ui/react-dialog";
import RatedMovieCard from "./RatedMovieCard";
import { CommonMovie } from "./pages/ComparePage";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

interface MoviesListProps {
  children: string;
  moviesList: CommonMovie[];
}

function RatedMoviesList({ children, moviesList }: MoviesListProps) {
  const movieShortList =
    moviesList.length > 6 ? moviesList.slice(0, 6) : moviesList;
  return (
    <section className="mt-16">
      <h1 className="text-2xl md:text-3xl leading-relaxed text-muted-foreground">
        {children}
      </h1>
      <p className="text-muted-foreground mb-2 ml-0.5">
        {moviesList.length} movies
      </p>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4 sm:gap-y-8 ${
          moviesList.length === 0 ? "bg-muted rounded-sm py-4" : ""
        }`}
      >
        {moviesList.length === 0 && (
          <p className="col-span-4 sm:col-span-6 md:col-span-8 p-4 text-center text-muted-foreground">
            No {children.toLowerCase()}
          </p>
        )}
        {movieShortList.map((movie) => (
          <RatedMovieCard key={movie.slug} ratedMovie={movie} />
        ))}
      </div>
      {moviesList.length > 6 && (
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
              <DialogTitle className="text-2xl md:text-3xl leading-relaxed text-muted-foreground">
                {children}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground mb-2 ml-0.5">
                {moviesList.length} movies
              </DialogDescription>
            </DialogHeader>
            <Separator />
            <ScrollArea className="h-[calc(100dvh-12rem)] md:max-h-120 rounded-b-sm">
              <div className="p-2 lg:pr-4 pb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4 sm:gap-y-8">
                {moviesList.map((movie) => (
                  <RatedMovieCard key={movie.slug} ratedMovie={movie} />
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
export default RatedMoviesList;
