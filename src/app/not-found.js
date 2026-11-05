import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-lg space-y-5 px-4 py-24 text-center">
      <p className="text-sm font-semibold text-muted-foreground">404</p>

      <h1 className="text-3xl font-bold tracking-tight">
        This page is off the shelf.
      </h1>

      <p className="text-muted-foreground">
        The page you were looking for could not be found.
      </p>

      <Link
        href="/"
        className="inline-flex rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
      >
        Back to Home
      </Link>
    </section>
  );
}