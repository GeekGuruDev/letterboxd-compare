import { useSearchParams } from "react-router";
import { Button } from "./ui/button";
import UsernameInput from "./UsernameInput";
import { useState } from "react";
import { UserKey } from "./pages/ComparePage";

interface ProfileErrorProps {
  userKey: UserKey;
}

function ProfileError({ userKey }: ProfileErrorProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const username: string = searchParams.get(userKey) || "";
  const [correctUsername, setCorrectUsername] = useState(username);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    searchParams.set(userKey, correctUsername);
    setSearchParams(searchParams);
  }

  return (
    <div className="my-16 flex-1 text-center text-muted-foreground">
      <p>
        Username{" "}
        <span className="text-foreground font-semibold">{username}</span> not
        found.
      </p>
      <p className="my-4">Please enter correct username and try again.</p>
      <form onSubmit={handleSubmit}>
        <UsernameInput
          placeholder="e.g. pjexplained"
          username={correctUsername}
          setUsername={setCorrectUsername}
          className="my-4 sm:max-w-64 mx-auto"
        >
          {""}
        </UsernameInput>
        <Button>Try again</Button>
      </form>
    </div>
  );
}
export default ProfileError;
