import { Suspense } from "react";

import Banner from "@/components/home/Banner";
import NewArrivals from "@/components/home/NewArrivals";

function BooksLoading() {
  return (
    <div
      role="status"
      className="flex items-center justify-center gap-3 py-20"
    >
      <span
        aria-hidden="true"
        className="size-6 animate-spin rounded-full border-2 border-muted border-t-primary"
      />

      <span className="text-sm text-muted-foreground">
        Loading new arrivals...
      </span>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Banner />

      <Suspense fallback={<BooksLoading />}>
        <NewArrivals />
      </Suspense>
    </>
  );
}