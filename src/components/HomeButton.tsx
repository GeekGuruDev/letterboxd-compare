import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Home } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

function HomeButton() {
  const navigate = useNavigate();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="lg"
            variant="outline"
            className="cursor-pointer absolute top-2 left-16"
            onClick={() => navigate("/")}
          >
            <Home />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Home</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default HomeButton;
