import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { MoveLeft } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

function BackButton() {
  const navigate = useNavigate();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="lg"
            variant="outline"
            className="cursor-pointer absolute top-2 left-2"
            onClick={() => navigate(-1)}
          >
            <MoveLeft />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Back</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default BackButton;
