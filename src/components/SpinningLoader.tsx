import React from "react";
import { cn } from "@/lib/utils"; // Assuming you have your cn utility function from shadcn/ui setup
import { Loader2 } from "lucide-react"; // Import the Loader2 icon from lucide-react

interface SpinningLoaderProps {
  className?: string;
  size?: number;
}

const SpinningLoader: React.FC<SpinningLoaderProps> = ({
  className,
  size = 24,
}) => {
  return (
    <Loader2
      size={size}
      className={cn("animate-spin text-blue-500 m-8", className)}
    />
  );
};

export default SpinningLoader;
