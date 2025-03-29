import { Heart, HeartOff } from "lucide-react";
import { UserReview } from "./MoviesCompare";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface UserReviewDetailsProps {
  userReview: UserReview;
}

function UserReviewDetails({ userReview }: UserReviewDetailsProps) {
  const { name, watchedDate, liked, rate, rateStars } = userReview;
  return (
    <div className="flex-1 flex flex-col gap-2 sm:gap-0 justify-evenly items-center">
      <p className="text-lg text-foreground line-clamp-1">{name}</p>
      <p className="flex flex-col text-muted-foreground text-sm sm:block">
        <span>Watched on </span>
        <span className="text-foreground">{watchedDate}</span>
      </p>

      <div className="flex items-center justify-center gap-4">
        {rateStars === null ? (
          <p className="text-muted-foreground text-sm">Not Rated</p>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="text-yellow-500 tracking-wider text-lg">
                  {rateStars}
                </p>
              </TooltipTrigger>
              <TooltipContent>{rate} Stars</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {liked ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Heart size={20} fill="#ff637e" strokeWidth={0} />
              </TooltipTrigger>
              <TooltipContent>Liked</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HeartOff size={20} color="#ff637e" />
              </TooltipTrigger>
              <TooltipContent>Not Liked</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
}
export default UserReviewDetails;
