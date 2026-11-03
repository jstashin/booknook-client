export default function BooksLoading() {
  return (
    <div
      role="status"
      className="flex min-h-[50vh] items-center justify-center gap-3"
    >
      <span
        aria-hidden="true"
        className="size-6 animate-spin rounded-full border-2 border-muted border-t-primary"
      />

      <span className="text-sm text-muted-foreground">
        Loading books...
      </span>
    </div>
  );
}