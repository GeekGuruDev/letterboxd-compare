import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Logo from "../Logo";
import UsernameInput from "../UsernameInput";
import { Button } from "../ui/button";
import { toast } from "sonner";
import Footer from "../Footer";

const cardStyle =
  "my-4 bg-white/75 backdrop-blur-xs shadow-[0px_0px_24px_2px_#000000] dark:bg-black/75";

function Homepage() {
  const [inputText1, setInputText1] = useState("");
  const [inputText2, setInputText2] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const username1 = inputText1.toLowerCase().trim();
    const username2 = inputText2.toLowerCase().trim();
    if (!username1 || !username2) {
      toast.error("Please enter both usernames.");
      return;
    }
    navigate(`/compare?user1=${username1}&user2=${username2}`);
    setInputText1("");
    setInputText2("");
  }

  return (
    <div className="min-h-dvh flex flex-col items-center bg-center bg-cover bg-[url(./assets/bg-image.jpg)]">
      <div className="flex-1 flex items-center">
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
                inputText={inputText1}
                setInputText={setInputText1}
              >
                User 1
              </UsernameInput>
              <UsernameInput
                placeholder="e.g. moviestalk"
                inputText={inputText2}
                setInputText={setInputText2}
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

      <Footer />
    </div>
  );
}
export default Homepage;
