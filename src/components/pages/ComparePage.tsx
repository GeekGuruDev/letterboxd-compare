import Logo from "../Logo";
import BackHomeButton from "../BackHomeButton";
import ProfileCompare from "../ProfileCompare";
import MoviesCompare from "../MoviesCompare";
import useProfile from "@/hooks/useProfile";

export const API_URL = "https://letterboxd-compare-api.onrender.com";
// export const API_URL = "http://localhost:3000";

export type UserKey = "user1" | "user2";

export type Profile = {
  username: string;
  displayName: string;
  avatar: string;
  moviesCount: number;
};

export type Movie = {
  title: string;
  slug: string;
  rate: number | null;
  rateStars: string | null;
  liked: boolean;
};

export type CommonMovie = {
  title: string;
  slug: string;
  user1: {
    name: string;
    rate: number | null;
    rateStars: string | null;
    liked: boolean;
  };
  user2: {
    name: string;
    rate: number | null;
    rateStars: string | null;
    liked: boolean;
  };
};

function ComparePage() {
  const profileState1 = useProfile("user1");
  const profileState2 = useProfile("user2");

  const { profile: profile1 } = profileState1;
  const { profile: profile2 } = profileState2;
  const isProfileSuccess = !!(profile1 && profile2);

  return (
    <div className="py-8 min-h-screen">
      <BackHomeButton />
      <header className="my-8">
        <Logo />
      </header>
      <main className="max-w-4xl p-4 mb-16 mx-auto">
        <ProfileCompare
          profileState1={profileState1}
          profileState2={profileState2}
        />
        {isProfileSuccess && (
          <MoviesCompare profile1={profile1} profile2={profile2} />
        )}
      </main>
    </div>
  );
}

export default ComparePage;
