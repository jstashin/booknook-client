import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

import { requireUser } from "@/lib/require-user";

export const metadata = {
  title: "Book Details",
};

export default async function BookDetailsPage({ params }) {
  const { id } = await params;

  await requireUser(`/books/${encodeURIComponent(id)}`);

  if (!/^[a-f0-9]{24}$/i.test(id)) {
    notFound();
  }
const token = await getTokenFromServer();

const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/books/${id}`,
  {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Could not load this book.");
  }

  const book = await response.json();
  const availableCopies = book.availableCopies ?? 0;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/books"
        className="text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        ← Back to All Books
      </Link>

      <div className="mt-6 grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div className="relative h-80 overflow-hidden rounded-xl border bg-muted md:h-96">
          {book.image ? (
            <Image
              src={book.image}
              alt={`Cover of ${book.title}`}
              fill
              sizes="(max-width: 767px) 100vw, 40vw"
              className="object-contain p-6"
            />
          ) : (
            <p className="flex h-full items-center justify-center text-sm text-muted-foreground">
              No cover available
            </p>
          )}
        </div>

        <div>
          <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            {book.category}
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {book.title}
          </h1>

          <p className="mt-2 text-muted-foreground">By {book.author}</p>

          <p className="mt-6 whitespace-pre-line leading-7">
            {book.description}
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-4 border-y py-4">
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

          {availableCopies === 0 ? (
            <button
              type="button"
              disabled
              className="mt-6 rounded-md bg-muted px-5 py-2.5 text-sm font-medium text-muted-foreground"
            >
              Not Available
            </button>
          ) : (
            <p className="mt-6 text-sm font-medium text-muted-foreground">
              Available to borrow
            </p>
          )}
        </div>
      </div>
    </section>
  );
}