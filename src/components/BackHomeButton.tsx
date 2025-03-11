import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Home } from "lucide-react";

function BackHomeButton() {
  const navigate = useNavigate();

  return (
    <Button
      size="lg"
      variant="outline"
      className="cursor-pointer absolute top-2 left-16"
      onClick={() => navigate("/")}
    >
      <Home />
    </Button>
  );
}

export default BackHomeButton;
