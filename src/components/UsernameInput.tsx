import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface UsernameInputProps {
  username: string;
  setUsername: (username: string) => void;
  children: string;
  placeholder: string;
}

function UsernameInput({
  username,
  setUsername,
  children,
  placeholder,
}: UsernameInputProps) {
  const id = children.replace(" ", "").toLowerCase();
  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="font-bold tracking-wider">
        {children}
      </Label>
      <Input
        id={id}
        type="text"
        placeholder={placeholder}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="bg-white/50  border-black/20 dark:bg-black/50 dark:border-white/10"
      />
    </div>
  );
}
export default UsernameInput;
