interface CommonMoviesCounterItemProps {
  count: number;
  name: string;
  color: "blue" | "emerald";
}

function CommonMoviesCounterItem({
  count,
  name,
  color,
}: CommonMoviesCounterItemProps) {
  const colorClass = color === "blue" ? "text-blue-600" : "text-emerald-600";
  return (
    <div className="flex-[1_1_0px]">
      <h1 className={`text-2xl tracking-wider ${colorClass} font-bold`}>
        {count}
      </h1>
      <p className="text-muted-foreground flex flex-col items-center">
        <span>movies watched by</span>
        <span>
          <span className="font-semibold">{name}</span> only
        </span>
      </p>
    </div>
  );
}
export default CommonMoviesCounterItem;
