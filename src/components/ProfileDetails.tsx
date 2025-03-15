import ProfileError from "./ProfileError";
import ProfileLoader from "./ProfileLoader";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { Profile, UserKey } from "./pages/ComparePage";

interface ProfileDetailsProps {
  isLoading: boolean;
  isError: boolean;
  profile: Profile | undefined;
  userKey: UserKey;
}

function ProfileDetails({
  isLoading,
  isError,
  profile,
  userKey,
}: ProfileDetailsProps) {
  if (isLoading) {
    return <ProfileLoader />;
  }

  if (isError) {
    return <ProfileError userKey={userKey} />;
  }

  const { avatar, displayName, username, moviesCount } = profile as Profile;
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
          {moviesCount}
        </p>
        <p className="text-sm text-muted-foreground leading-8 text-center">
          movies
        </p>
      </div>
    </div>
  );
}

export default ProfileDetails;
