import BookCard from "@/components/books/BookCard";

export const metadata = {
  title: "All Books",
};

export default async function AllBooksPage() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/books`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Could not load books.");
  }

  const books = await response.json();

  if (!Array.isArray(books)) {
    throw new Error("Invalid books response.");
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          All Books
        </h1>

        <p className="mt-4 text-muted-foreground">
          Explore our shelves and find your next favorite story.
        </p>
      </div>

      {books.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed px-6 py-16 text-center">
          <h2 className="text-xl font-semibold">
            Our shelves are waiting for new stories.
          </h2>

          <p className="mt-3 text-sm text-muted-foreground">
            No books have been added yet. Check back soon!
          </p>
        </div>
      )}
    </section>
  );
}