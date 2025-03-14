import CommonMoviesCounterItem from "./CommonMoviesCounterItem";
import { CommonMovie } from "./pages/ComparePage";

interface CommonMoviesCounterProps {
  commonMovies: CommonMovie[];
  moviesStat1: number;
  moviesStat2: number;
  name1: string;
  name2: string;
}

function CommonMoviesCounter({
  commonMovies,
  moviesStat1,
  moviesStat2,
  name1,
  name2,
}: CommonMoviesCounterProps) {
  return (
    <div className="text-center mt-8">
      <div className="md:hidden">
        <h1 className="text-4xl tracking-wider bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent font-extrabold w-max mx-auto">
          {commonMovies.length}
        </h1>
        <p className="text-lg text-muted-foreground flex flex-col items-center">
          <span>movies watched</span>
          <span>by both</span>
        </p>
      </div>
      <div className="flex justify-center md:items-end">
        <CommonMoviesCounterItem
          count={moviesStat1 - commonMovies.length}
          name={name1}
          color="blue"
        />
        <div className="hidden md:block">
          <h1 className="text-4xl tracking-wider bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent font-extrabold w-max mx-auto">
            {commonMovies.length}
          </h1>
          <p className="text-muted-foreground flex flex-col items-center">
            <span>movies watched</span>
            <span>by both</span>
          </p>
        </div>
        <CommonMoviesCounterItem
          count={moviesStat2 - commonMovies.length}
          name={name2}
          color="emerald"
        />
      </div>
    </div>
  );
}
export default CommonMoviesCounter;
