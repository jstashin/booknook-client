"use client";

export default function BooksError({ reset }) {
  return (
    <div
      role="alert"
      className="mx-auto max-w-xl px-4 py-20 text-center"
    >
      <h2 className="text-2xl font-semibold">
        Books could not be loaded.
      </h2>

      <p className="mt-3 text-muted-foreground">
        Please try again in a moment.
      </p>

      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
      >
        Try Again
      </button>
    </div>
  );
}