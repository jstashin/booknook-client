import Link from "next/link";

import BookCard from "@/components/books/BookCard";
import { Button } from "@/components/ui/button";

export default async function NewArrivals() {
  let books;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/books?limit=6`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to load new arrivals");
    }

    books = await response.json();
  } catch (error) {
    console.error("New arrivals:", error.message);

    return (
      <section className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h2 className="text-3xl font-bold">New Arrivals</h2>

        <p role="alert" className="mt-4 text-muted-foreground">
          Books could not be loaded. Please refresh and try again.
        </p>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="new-arrivals-heading"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mb-10 text-center">
        <h2
          id="new-arrivals-heading"
          className="text-3xl font-bold tracking-tight sm:text-4xl"
        >
          New Arrivals
        </h2>

        <p className="mt-4 text-muted-foreground">
          Find your next favorite among our newest books.
        </p>
      </div>

      {books.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">
          No books on the shelves yet. Check back soon!
        </p>
      )}

      <div className="mt-10 flex justify-center">
        <Button asChild>
          <Link href="/books">See All Books</Link>
        </Button>
      </div>
    </section>
  );
}