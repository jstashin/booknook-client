import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function BookCard({ book }) {
  return (
    <Card className="flex h-full flex-col overflow-hidden pt-0">
      <div className="relative h-64 bg-muted">
        <Image
          src={book.image}
          alt={`Cover of ${book.title}`}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="object-contain p-5"
        />
      </div>

      <CardContent className="flex-1 space-y-3">
        <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
          {book.category}
        </span>

        <h3 className="text-xl font-semibold leading-snug">
          {book.title}
        </h3>

        <p className="text-sm text-muted-foreground">
          By {book.author}
        </p>
      </CardContent>

      <CardFooter>
        <Link
          href={`/books/${book._id}`}
          className="inline-flex h-10 w-full items-center justify-center rounded-md border px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
}