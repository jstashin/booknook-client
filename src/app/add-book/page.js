import AddBookForm from "@/components/books/AddBookForm";
import { requireUser } from "@/lib/require-user";

export const metadata = {
  title: "Add Book",
};

export default async function AddBookPage() {
  const user = await requireUser("/add-book");

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Add a Book</h1>
      <p className="mt-3 text-muted-foreground">
        Share a book with the BookNook community.
      </p>

      <AddBookForm name={user.name} email={user.email} />
    </section>
  );
}