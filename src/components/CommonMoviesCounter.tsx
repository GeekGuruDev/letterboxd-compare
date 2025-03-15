import CommonMoviesCounterItem from "./CommonMoviesCounterItem";
import { Profile } from "./pages/ComparePage";

interface CommonMoviesCounterProps {
  commonMoviesCount: number;
  user1: Profile;
  user2: Profile;
}

function CommonMoviesCounter({
  commonMoviesCount,
  user1,
  user2,
}: CommonMoviesCounterProps) {
  const { displayName: name1, moviesCount: moviesCount1 } = user1;
  const { displayName: name2, moviesCount: moviesCount2 } = user2;
  return (
    <div className="text-center mt-8">
      <div className="md:hidden">
        <h1 className="text-4xl tracking-wider bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent font-extrabold w-max mx-auto">
          {commonMoviesCount}
        </h1>
        <p className="text-lg text-muted-foreground flex flex-col items-center">
          <span>movies watched</span>
          <span>by both</span>
        </p>
      </div>
      <div className="flex justify-center md:items-end">
        <CommonMoviesCounterItem
          count={moviesCount1 - commonMoviesCount}
          name={name1}
          color="blue"
        />
        <div className="hidden md:block">
          <h1 className="text-4xl tracking-wider bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent font-extrabold w-max mx-auto">
            {commonMoviesCount}
          </h1>
          <p className="text-muted-foreground flex flex-col items-center">
            <span>movies watched</span>
            <span>by both</span>
          </p>
        </div>
        <CommonMoviesCounterItem
          count={moviesCount2 - commonMoviesCount}
          name={name2}
          color="emerald"
        />
      </div>
    </div>
  );
}
export default CommonMoviesCounter;
