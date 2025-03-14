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
    <h4 className="text-center text-2xl my-16">
      <span className="font-bold">
        {moviesStat1 >= moviesStat2 ? name1 : name2}
      </span>{" "}
      watched{" "}
      <span className="font-bold text-blue-500">
        {Math.abs(moviesStat1 - moviesStat2)}
      </span>{" "}
      more movies
    </h4>
  );
}
export default WatchedMore;
