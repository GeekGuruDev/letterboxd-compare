import CommonMoviesCounter from "./CommonMoviesCounter";
import MatchingScore from "./MatchingScore";
import { CommonMovie } from "./pages/ComparePage";
import VennDiagram from "./VennDiagram";

interface MatchingScoreSectionProps {
  moviesStat1: number;
  moviesStat2: number;
  name1: string;
  name2: string;
  commonMovies: CommonMovie[];
}

function MatchingScoreSection({
  moviesStat1,
  moviesStat2,
  name1,
  name2,
  commonMovies,
}: MatchingScoreSectionProps) {
  const commonMoviesStat = commonMovies.length;
  return (
    <section className="mt-24">
      <MatchingScore
        commonMoviesStat={commonMoviesStat}
        moviesStat1={moviesStat1}
        moviesStat2={moviesStat2}
      />

      <VennDiagram
        user1={{ name: name1, moviesStat: moviesStat1 }}
        user2={{ name: name2, moviesStat: moviesStat2 }}
        commonMoviesStat={commonMoviesStat}
      />

      <CommonMoviesCounter
        commonMovies={commonMovies}
        moviesStat1={moviesStat1}
        moviesStat2={moviesStat2}
        name1={name1}
        name2={name2}
      />
    </section>
  );
}

export default MatchingScoreSection;
