import { Skeleton } from "./ui/skeleton";

function ProfileLoader() {
  return (
    <div className="flex flex-col flex-1 items-center gap-8">
      <Skeleton className="w-[96px] h-[96px] rounded-full" />
      <div className="flex flex-col items-center gap-1">
        <Skeleton className="w-[100px] h-[28px] md:h-[32px]" />
        <Skeleton className="w-[50px] h-[19px] md:h-[24px]" />
      </div>
      <div>
        <Skeleton className="w-[96px] h-[40px]" />
        <Skeleton className="my-[8px] mx-auto w-[80px] h-[16px]" />
      </div>
    </div>
  );
}
export default ProfileLoader;
