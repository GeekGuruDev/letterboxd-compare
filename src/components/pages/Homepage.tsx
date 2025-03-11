import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Logo from "../Logo";
import UsernameInput from "../UsernameInput";
import { Button } from "../ui/button";

const cardStyle =
  "bg-white/75 backdrop-blur-xs shadow-[0px_0px_24px_2px_#000000] dark:bg-black/75";

function Homepage() {
  const [username1, setUsername1] = useState("");
  const [username2, setUsername2] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!username1 || !username2) return;
    navigate(`/compare?user1=${username1}&user2=${username2}`);
    setUsername1("");
    setUsername2("");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-center bg-cover bg-[url(./assets/bg-image.jpg)]">
      <Card className={cardStyle}>
        <CardHeader>
          <CardTitle className="mb-4">
            <Logo />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <UsernameInput
              placeholder="e.g. pjexplained"
              username={username1}
              setUsername={setUsername1}
            >
              User 1
            </UsernameInput>
            <UsernameInput
              placeholder="e.g. desinerdguy"
              username={username2}
              setUsername={setUsername2}
            >
              User 2
            </UsernameInput>
            <Button
              type="submit"
              className="tracking-wider cursor-pointer w-full rounded-md bg-gradient-to-r from-blue-600 to-teal-700 text-white  py-2 px-4 hover:from-blue-500 hover:to-teal-600"
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
export default Homepage;
