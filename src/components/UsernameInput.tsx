import { Input } from "./ui/input";
import { Label } from "./ui/label";

import { cn } from "@/lib/utils";

interface UsernameInputProps {
  inputText: string;
  setInputText: (inputText: string) => void;
  children?: string;
  placeholder: string;
  className?: string;
}

function UsernameInput({
  inputText,
  setInputText,
  children = "",
  placeholder,
  className = "",
}: UsernameInputProps) {
  const id = children.replace(" ", "").toLowerCase();
  return (
    <div className={cn("grid gap-2", className)}>
      {children.length > 0 && (
        <Label htmlFor={id} className="font-bold tracking-wider">
          {children}
        </Label>
      )}
      <Input
        id={id}
        type="text"
        placeholder={placeholder}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="bg-white/50  border-black/20 dark:bg-black/50 dark:border-white/10"
      />
    </div>
  );
}
export default UsernameInput;
