import { Profile } from "./pages/ComparePage";
import ProfileDetails from "./ProfileDetails";
import { Separator } from "./ui/separator";
import WatchedMore from "./WatchedMore";

interface ProfileCompareProps {
  profileState1: {
    profile: Profile | undefined;
    isPending: boolean;
    isError: boolean;
  };
  profileState2: {
    profile: Profile | undefined;
    isPending: boolean;
    isError: boolean;
  };
}

function ProfileCompare({ profileState1, profileState2 }: ProfileCompareProps) {
  const {
    profile: profile1,
    isPending: isLoading1,
    isError: isError1,
  } = profileState1;

  const {
    profile: profile2,
    isPending: isLoading2,
    isError: isError2,
  } = profileState2;

  const isLoading = isLoading1 || isLoading2;
  const isError = isError1 || isError2;

  return (
    <section>
      <div className="flex justify-center gap-2">
        <ProfileDetails
          isLoading={isLoading1}
          isError={isError1}
          profile={profile1}
          userKey="user1"
        />
        <Separator orientation="vertical" />
        <ProfileDetails
          isLoading={isLoading2}
          isError={isError2}
          profile={profile2}
          userKey="user2"
        />
      </div>
      {!isError && (
        <WatchedMore
          profile1={profile1 as Profile}
          profile2={profile2 as Profile}
          isLoading={isLoading}
        />
      )}
    </section>
  );
}

export default ProfileCompare;
