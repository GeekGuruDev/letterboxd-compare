import { Star } from "lucide-react";
import { Movie } from "./pages/ComparePage";

function AverageRating({
  moviesData,
  name,
}: {
  moviesData: Movie[];
  name: string;
}) {
  const totalRating = moviesData.reduce(
    (acc, movie) => acc + (movie.rate || 0),
    0
  );
  const avgRating = totalRating / moviesData.length; // averageRating
  const avgRatingFormatted = (Math.round(avgRating * 100) / 100).toFixed(2);

  return (
    <div className="flex-1 flex flex-col justify-between items-center gap-4">
      <div className="text-lg tracking-wide text-muted-foreground">
        <h4>{name}'s</h4>
        <h4>Average Rating</h4>
      </div>
      <div className="font-medium text-4xl tracking-wider gap-4 flex items-center">
        <h3>{avgRatingFormatted}</h3>
        <Star fill="#f0b100" size={36} strokeWidth={0} />
      </div>
    </div>
  );
}
export default AverageRating;
