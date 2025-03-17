import React from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "../contexts/ThemeContext ";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@radix-ui/react-switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const ThemeToggle: React.FC = () => {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme((currTheme) => (currTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="absolute top-2 left-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={toggleTheme}
              variant="outline"
              size="lg"
              className="cursor-pointer"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{theme === "light" ? "Dark Mode" : "Light Mode"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Switch className="hidden" />
    </div>
  );
};

export default ThemeToggle;
