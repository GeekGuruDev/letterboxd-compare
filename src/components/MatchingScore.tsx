interface MatchingScoreProps {
  commonMoviesStat: number;
  moviesStat1: number;
  moviesStat2: number;
}

const MatchingScore = ({
  commonMoviesStat,
  moviesStat1,
  moviesStat2,
}: MatchingScoreProps) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl text-center leading-relaxed text-muted-foreground">
        Matching Score
      </h1>
      <h1 className="text-6xl w-max mx-auto tracking-wide font-bold">
        <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
          {((commonMoviesStat * 2 * 100) / (moviesStat1 + moviesStat2)).toFixed(
            2
          )}{" "}
        </span>
        <span className="text-emerald-600">%</span>
      </h1>
    </div>
  );
};

export default MatchingScore;
