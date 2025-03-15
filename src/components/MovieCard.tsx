import useMovie from "@/hooks/useMovie";
import { Skeleton } from "./ui/skeleton";

function MovieCard({ slug }: { slug: string }) {
  const { movie, isPending } = useMovie(slug);

  return (
    <div className="flex flex-col items-center">
      {isPending && (
        <>
          <Skeleton className="w-[70px] h-[105px] rounded-sm" />
          <Skeleton className="w-[80px] h-[14px] mt-1" />
          <Skeleton className="w-[40px] h-[14px] mt-1" />
        </>
      )}
      {movie && (
        <>
          <a href={`https://letterboxd.com/film/${slug}/`} target="_blank">
            <div className="w-[70px] h-[105px] overflow-hidden">
              <img
                className="rounded-sm"
                src={movie.poster}
                alt={movie.title}
              />
            </div>
          </a>
          <p className="mt-1 px-1 text-xs text-center text-muted-foreground line-clamp-2">
            {movie.title}
          </p>
        </>
      )}
    </div>
  );
}

export default MovieCard;
