import { Star } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { Movie } from "./pages/ComparePage";

interface AverageRatingProps {
  movies: Movie[] | undefined;
  name: string | undefined;
  isLoading: boolean;
  isError: boolean;
}

function AverageRating({
  movies,
  name,
  isLoading,
  isError,
}: AverageRatingProps) {
  if (isError) {
    return (
      <div className="flex-1">
        <p className="text-destructive-foreground text-center">
          Error fetching {name} movies details
        </p>
      </div>
    );
  }

  let avgRatingFormatted = "";
  if (!isError && !isLoading) {
    const moviesValue = movies!;
    const totalRating = moviesValue.reduce(
      (acc, movie) => acc + (movie.rate || 0),
      0
    );

    const avgRating = totalRating / moviesValue.length; // averageRating
    avgRatingFormatted = (Math.round(avgRating * 100) / 100).toFixed(2);
  }

  return (
    <div className="flex-1 flex flex-col justify-between items-center gap-4">
      <div className="text-lg tracking-wide text-muted-foreground">
        <h4>{name}'s</h4>
        <h4>Average Rating</h4>
      </div>
      {isLoading && (
        <div className="font-medium text-4xl tracking-wider gap-4 flex items-center">
          <Skeleton className="w-[70px] h-[40px]" />
          <Skeleton className="w-[40px] h-[40px] rounded-full" />
        </div>
      )}
      {!isError && !isLoading && (
        <div className="font-medium text-4xl tracking-wider gap-4 flex items-center">
          <h3>{avgRatingFormatted}</h3>
          <Star fill="#f0b100" size={36} strokeWidth={0} />
        </div>
      )}
    </div>
  );
}
export default AverageRating;
