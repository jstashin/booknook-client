import Link from "next/link";
import BookCard from "@/components/books/BookCard";
import DeleteBookButton from "@/components/books/DeleteBookButton";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { requireUser } from "@/lib/require-user";

export const metadata = {
  title: "My Books",
};

export default async function MyBooksPage() {
  await requireUser("/my-books");

  const token = await getTokenFromServer();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/books?mine=true`,
    {
      cache: "no-store",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!response.ok) {
    throw new Error("Could not load your books.");
  }

  const books = await response.json();

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Books</h1>
          <p className="mt-2 text-muted-foreground">
            Manage the books you have shared with BookNook.
          </p>
        </div>

        <Link
          href="/add-book"
          className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
        >
          Add Book
        </Link>
      </div>

      {books.length === 0 ? (
        <p className="mt-8 rounded-lg border border-dashed p-6 text-muted-foreground">
          You have not added any books yet.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <div key={book._id} className="flex min-w-0 flex-col gap-3">
              <div className="flex-1">
                <BookCard book={book} />
              </div>

              <div className="flex gap-3">
                <Link
                  href={`/edit-book/${book._id}`}
                  className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent"
                >
                  Edit
                </Link>

                <DeleteBookButton id={book._id} title={book.title} />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}