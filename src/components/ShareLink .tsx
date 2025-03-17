import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { toast } from "sonner";

const ShareLink = ({ link }: { link: string }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleCopyClick() {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(link);
        setCopied(true);
        toast.success("Link Copied!");
        setTimeout(() => setCopied(false), 5000); // Reset after 2 seconds
      } catch (err) {
        console.log(`Link copy error: ${err}`);
        toast.error("Error copying link");
      }
    } else {
      // Fallback for older browsers (or if clipboard API is blocked)
      if (inputRef.current) {
        inputRef.current.select();
        document.execCommand("copy"); // Deprecated, but fallback
        setCopied(true);
        toast.success("Link Copied!");
        setTimeout(() => setCopied(false), 5000);
      } else {
        toast.error("Error copying link");
      }
    }
  }

  return (
    <section className="mt-24 mb-8 sm:w-max mx-auto">
      <h3 className="text-xl my-2">
        Share this comparison link with your friends.
      </h3>
      <div className="flex items-center space-x-2">
        <Input
          ref={inputRef}
          type="text"
          value={link}
          readOnly
          className="w-full sm:w-80"
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="lg" onClick={handleCopyClick} className="px-4">
                {copied ? (
                  <div className="flex gap-2 w-20 justify-center ">
                    <p>Copied</p>
                    <Check className="h-4 w-4" />
                  </div>
                ) : (
                  <div className="flex gap-2 w-20 justify-center">
                    <p>Copy</p>
                    <Copy className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{copied ? "Copied!" : "Copy Link"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </section>
  );
};

export default ShareLink;
