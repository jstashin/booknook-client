import Link from "next/link";
import { notFound } from "next/navigation";
import EditBookForm from "@/components/books/EditBookForm";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { requireUser } from "@/lib/require-user";

export const metadata = {
  title: "Edit Book",
};

export default async function EditBookPage({ params }) {
  const { id } = await params;

  await requireUser(`/edit-book/${encodeURIComponent(id)}`);

  if (!/^[a-f0-9]{24}$/i.test(id)) {
    notFound();
  }

  const token = await getTokenFromServer();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/books?mine=true`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Could not load your book.");
  }

  const books = await response.json();
  const book = books.find((item) => item._id === id.toLowerCase());

  if (!book) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/my-books" className="text-sm underline underline-offset-4">
        Back to My Books
      </Link>

      <h1 className="mt-5 text-3xl font-bold">Edit Book</h1>

      <EditBookForm book={book} />
    </section>
  );
}