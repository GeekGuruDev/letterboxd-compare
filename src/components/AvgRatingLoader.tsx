import { Skeleton } from "./ui/skeleton";

function AvgRatingLoader() {
  return (
    <div className="flex-1 flex flex-col items-center gap-4 ">
      <Skeleton className="w-[96px] h-[56px]" />
      <div className="font-medium text-4xl tracking-wider gap-4 flex items-center">
        <Skeleton className="w-[70px] h-[40px]" />
        <Skeleton className="w-[40px] h-[40px] rounded-full" />
      </div>
    </div>
  );
}
export default AvgRatingLoader;
