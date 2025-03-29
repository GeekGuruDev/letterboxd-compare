import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Separator } from "./ui/separator";

interface ListDialogProps {
  heading: string;
  children: React.ReactNode;
  moviesCount: number;
}

function ListDialog({ heading, children, moviesCount }: ListDialogProps) {
  return (
    <Dialog>
      <div className="flex justify-center">
        <DialogTrigger asChild className="flex justify-center">
          <Button variant="outline" className="my-4 cursor-pointer">
            See All
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent className="block sm:max-w-[calc(100%-2rem)] lg:max-w-4xl px-0 pb-0">
        <DialogHeader className="px-4 block text-left">
          <DialogTitle className="mr-4 text-xl md:text-2xl text-muted-foreground">
            {heading}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground my-2 ml-0.5">
            {moviesCount} movies
          </DialogDescription>
        </DialogHeader>
        <Separator />
        {children}
      </DialogContent>
    </Dialog>
  );
}
export default ListDialog;
