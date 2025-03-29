function UserReviewContent({ review }: { review: string }) {
  return (
    <p className="flex-1 flex justify-center font-serif text-muted-foreground">
      {review}
    </p>
  );
}
export default UserReviewContent;
