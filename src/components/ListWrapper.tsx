interface ListWrapperProps {
  heading: string;
  children: React.ReactNode;
  moviesCount: number;
}

function ListWrapper({ heading, children, moviesCount }: ListWrapperProps) {
  return (
    <section className="mt-16">
      <h1 className="font-semibold text-xl md:text-2xl text-muted-foreground">
        {heading}
      </h1>
      <p className="ml-0.5 text-muted-foreground my-2">{moviesCount} movies</p>
      {moviesCount === 0 ? (
        <div className="bg-muted rounded-sm py-4">
          <p className="p-4 text-center text-muted-foreground">
            No {heading.toLowerCase()}
          </p>
        </div>
      ) : (
        children
      )}
    </section>
  );
}
export default ListWrapper;
