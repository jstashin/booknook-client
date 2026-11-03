import { requireUser } from "@/lib/require-user";

export const metadata = {
  title: "Add Book",
};

export default async function AddBookPage() {
  const user = await requireUser("/add-book");

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold">Add a Book</h1>

      <p className="mt-4 text-muted-foreground">
        Welcome, {user.name}. Share your next great read.
      </p>

      <div className="mt-8 rounded-lg border bg-card p-6">
        <p className="text-sm">
          Logged in as: {user.email}
        </p>

        <p className="mt-3 text-sm text-muted-foreground">
          Your book creation form will go here.
        </p>
      </div>
    </section>
  );
}