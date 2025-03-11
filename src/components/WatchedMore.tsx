interface WatchedMoreProps {
  name1: string;
  name2: string;
  moviesStat1: number;
  moviesStat2: number;
}

function WatchedMore({
  name1,
  name2,
  moviesStat1,
  moviesStat2,
}: WatchedMoreProps) {
  return (
    <h3 className="text-center text-2xl my-16">
      {moviesStat1 >= moviesStat2 ? name1 : name2} has watched{" "}
      <span className="font-bold">{Math.abs(moviesStat1 - moviesStat2)}</span>{" "}
      more movies
    </h3>
  );
}
export default WatchedMore;
