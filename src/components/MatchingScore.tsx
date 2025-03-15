import { Skeleton } from "./ui/skeleton";

interface MatchingScoreProps {
  commonMoviesCount: number;
  moviesCount1: number;
  moviesCount2: number;
  isLoading: boolean;
}

const MatchingScore = ({
  commonMoviesCount,
  moviesCount1,
  moviesCount2,
  isLoading,
}: MatchingScoreProps) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl text-center leading-relaxed text-muted-foreground">
        Matching Score
      </h1>
      {isLoading && <Skeleton className="w-[200px] h-[60px] mx-auto" />}
      {!isLoading && (
        <h1 className="text-6xl w-max mx-auto tracking-wide font-bold">
          <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
            {(
              (commonMoviesCount * 2 * 100) /
              (moviesCount1 + moviesCount2)
            ).toFixed(2)}{" "}
          </span>
          <span className="text-emerald-600">%</span>
        </h1>
      )}
    </div>
  );
};

export default MatchingScore;
