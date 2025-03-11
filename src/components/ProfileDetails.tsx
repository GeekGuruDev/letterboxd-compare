import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { Profile } from "./pages/ComparePage";

function ProfileDetails({ data }: { data: Profile }) {
  const { avatar, displayName, username, moviesStat } = data;

  return (
    <div className="flex flex-col flex-1 justify-between items-center gap-8">
      <a href={`https://letterboxd.com/${username}`} target="_blank">
        <Avatar className="size-24">
          <AvatarImage src={avatar} alt="avater" />
          <AvatarFallback>
            <Skeleton className="w-[96px] h-[96px] rounded-full" />
          </AvatarFallback>
        </Avatar>
      </a>
      <div className="text-center tracking-wide flex-1 flex flex-col justify-between">
        <h1 className="text-lg font-bold md:text-2xl flex-1 flex items-center justify-center">
          {displayName}
        </h1>
        <a
          href={`https://letterboxd.com/${username}`}
          target="_blank"
          className="text-sm md:text-lg text-muted-foreground"
        >
          @{username}
        </a>
      </div>

      <div>
        <p className=" text-blue-500 text-4xl font-bold tracking-wider">
          {moviesStat}
        </p>
        <p className="text-sm text-muted-foreground leading-8 text-center">
          movies
        </p>
      </div>
    </div>
  );
}
export default ProfileDetails;
