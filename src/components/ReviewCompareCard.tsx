import useMovie from "@/hooks/useMovie";
import { CommonReview } from "./MoviesCompare";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import UserReviewContent from "./UserReviewContent";
import { Skeleton } from "./ui/skeleton";
import UserReviewDetails from "./UserReviewDetails";

interface ReviewCardProps {
  review: CommonReview;
}

function ReviewCompareCard({ review }: ReviewCardProps) {
  const { movie } = useMovie(review.slug);

  return (
    <Card className="bg-muted px-2 py-4 sm:p-4 pb-8">
      <CardHeader className="p-0">
        <CardTitle>
          <p className="mb-1 text-center text-sm tracking-wide line-clamp-1">
            {review.title}{" "}
            <span className="font-light">({review.releaseYear})</span>
          </p>
        </CardTitle>
        <div className="flex gap-2">
          <UserReviewDetails userReview={review.user1} />
          {movie ? (
            <a
              href={`https://letterboxd.com/film/${review.slug}/`}
              target="_blank"
              className="self-center"
            >
              <div className="w-[70px] h-[105px] overflow-hidden">
                <img
                  className="w-[72px] rounded-md object-cover"
                  src={movie.poster}
                  alt={movie.title}
                />
              </div>
            </a>
          ) : (
            <Skeleton className="w-[70px] h-[105px] rounded-md" />
          )}
          <UserReviewDetails userReview={review.user2} />
        </div>
      </CardHeader>
      <CardContent className="p-0 flex">
        <div className="flex-1">
          <div className="flex gap-4 justify-evenly">
            <UserReviewContent review={review.user1.review} />
            <Separator orientation="vertical" className="bg-zinc-500" />
            <UserReviewContent review={review.user2.review} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
export default ReviewCompareCard;
