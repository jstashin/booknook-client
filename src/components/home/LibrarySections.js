import Link from "next/link";

const steps = [
  {
    title: "Find a book",
    description: "Browse the shelves and pick a story you’d like to read.",
  },
  {
    title: "Borrow it",
    description: "Sign in and confirm your loan from the book’s details page.",
  },
  {
    title: "Return it",
    description: "When you finish, return the book from My Borrows.",
  },
];

const categories = [
  { name: "Fiction", description: "Get lost in a good story." },
  { name: "Science", description: "Explore how the world works." },
  { name: "History", description: "Discover stories from the past." },
  { name: "Kids", description: "Find a story to read together." },
  { name: "Others", description: "Try something unexpected." },
];

export default function LibrarySections() {
  return (
    <>
      <section
        aria-labelledby="borrowing-heading"
        className="border-y bg-muted/40"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2
            id="borrowing-heading"
            className="text-center text-3xl font-bold tracking-tight sm:text-4xl"
          >
            How Borrowing Works
          </h2>

          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="rounded-xl border bg-card p-6">
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="categories-heading"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <h2
          id="categories-heading"
          className="text-center text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Explore Our Categories
        </h2>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => (
            <li key={category.name} className="rounded-xl border bg-card p-5">
              <h3 className="font-semibold">{category.name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {category.description}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-8 text-center">
          <Link
            href="/books"
            className="inline-flex h-11 items-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Browse Books
          </Link>
        </div>
      </section>
    </>
  );
}