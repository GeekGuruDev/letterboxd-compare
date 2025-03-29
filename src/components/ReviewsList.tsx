import ListDialog from "./ListDialog";
import ListWrapper from "./ListWrapper";
import { CommonReview } from "./MoviesCompare";
import ReviewCompareCard from "./ReviewCompareCard";
import SpinningLoader from "./SpinningLoader";
import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";

interface ReviewsListProps {
  reviewsList: CommonReview[];
  isLoading?: boolean;
  children: string;
}

function ReviewsList({ reviewsList, isLoading, children }: ReviewsListProps) {
  if (isLoading) {
    return (
      <section className="mt-16">
        <h1 className="font-semibold text-xl md:text-xl text-muted-foreground">
          {children}
        </h1>
        <Skeleton className="w-[64px] h-[24px] my-2" />
        <div className="bg-muted rounded-sm py-4">
          <SpinningLoader size={48} className="mx-auto" />
        </div>
      </section>
    );
  }

  const limitedReviewsList =
    reviewsList.length > 2 ? reviewsList.slice(0, 2) : reviewsList;

  return (
    <ListWrapper heading={children} moviesCount={reviewsList.length}>
      <div className="grid grid-cols-1 gap-8">
        {limitedReviewsList.map((review) => (
          <ReviewCompareCard
            key={`${review.slug}-${review.user1.watchedDate}`}
            review={review}
          />
        ))}
      </div>
      {reviewsList.length > 2 && (
        <ListDialog heading={children} moviesCount={reviewsList.length}>
          <ScrollArea className="h-[calc(100dvh-12rem)] md:max-h-120 rounded-b-sm">
            <div className="p-2 lg:pr-4 pb-8 grid grid-cols-1 gap-8">
              {reviewsList.map((review) => (
                <ReviewCompareCard
                  key={`${review.slug}-${review.user1.watchedDate}`}
                  review={review}
                />
              ))}
            </div>
          </ScrollArea>
        </ListDialog>
      )}
    </ListWrapper>
  );
}
export default ReviewsList;
