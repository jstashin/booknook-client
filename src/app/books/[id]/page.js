import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import BookLoanButton from "@/components/books/BookLoanButton";
import { booksApi } from "@/lib/books-api";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { requireUser } from "@/lib/require-user";

export const metadata = {
  title: "Book Details",
};

export default async function BookDetailsPage({ params }) {
  const { id } = await params;
  const user = await requireUser(`/books/${encodeURIComponent(id)}`);

  if (!/^[a-f0-9]{24}$/i.test(id)) {
    notFound();
  }

  const token = await getTokenFromServer();
  let book;

  try {
    book = await booksApi(`/books/${id}`, { token });
  } catch (error) {
    if (error.status === 404) {
      notFound();
    }

    throw error;
  }

  const availableCopies = book.availableCopies ?? 0;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/books" className="text-sm underline underline-offset-4">
        ← Back to All Books
      </Link>

      <div className="mt-6 grid items-start gap-8 md:grid-cols-2">
        <div className="relative h-80 overflow-hidden rounded-xl border bg-muted md:h-96">
          {book.image ? (
            <Image
              src={book.image}
              alt={`Cover of ${book.title}`}
              fill
              sizes="(max-width: 767px) 100vw, 50vw"
              className="object-contain p-6"
            />
          ) : (
            <p className="flex h-full items-center justify-center text-muted-foreground">
              No cover available
            </p>
          )}
        </div>

        <div className="space-y-4">
          <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium">
            {book.category}
          </span>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {book.title}
          </h1>

          <p className="text-muted-foreground">By {book.author}</p>

          <p className="whitespace-pre-line leading-7">{book.description}</p>

          <dl className="grid grid-cols-2 gap-4 border-y py-4">
            <div>
              <dt className="text-sm text-muted-foreground">Added by</dt>
              <dd className="mt-1 font-medium">
                {book.addedBy?.name || "BookNook Library"}
              </dd>
            </div>

            <div>
              <dt className="text-sm text-muted-foreground">
                Available copies
              </dt>
              <dd className="mt-1 font-medium">{availableCopies}</dd>
            </div>
          </dl>

          <BookLoanButton
            action="borrow"
            id={book._id}
            title={book.title}
            name={user.name}
            email={user.email}
            unavailable={availableCopies < 1}
          />
        </div>
      </div>
    </section>
  );
}