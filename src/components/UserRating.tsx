function UserRating({
  name,
  rate,
  rateStars,
}: {
  name: string;
  rate: number | null;
  rateStars: string | null;
}) {
  const truncatedName = name.length > 8 ? name.slice(0, 8) + "..." : name;
  return (
    <div className="flex-1 text-center">
      <p className="text-sm text-muted-foreground line-clamp-1 px-1">
        {truncatedName}
      </p>
      <h4 className="font-bold text-lg tracking-wider">{rate}</h4>
      <p className="tracking-wider text-yellow-500">{rateStars}</p>
    </div>
  );
}

export default UserRating;
