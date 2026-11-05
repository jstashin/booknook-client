import Link from "next/link";
import { BookOpen, Mail } from "lucide-react";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="mt-auto border-t bg-muted/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
       
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-2xl font-bold"
          >
            <BookOpen className="size-7" aria-hidden="true" />
            BookNook
          </Link>

          <p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground">
            Discover a new story, share a favorite, and borrow your
            next great read. A small library for curious minds.
          </p>
        </div>

       
        <div>
          <h2 className="text-base font-semibold">Explore</h2>

          <nav
            aria-label="Footer navigation"
            className="mt-4 flex flex-col items-start gap-3 text-sm text-muted-foreground"
          >
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>

            <Link href="/books" className="hover:text-foreground">
              All Books
            </Link>

            <Link href="/register" className="hover:text-foreground">
              Join BookNook
            </Link>
          </nav>
        </div>

        <div>
          <h2 className="text-base font-semibold">Get in touch</h2>

          <a
            href="mailto:hello@booknook.example"
            className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <Mail className="size-4" aria-hidden="true" />
            hello@booknook.example
          </a>

         
          <div className="mt-5 flex gap-3">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex size-10 items-center justify-center rounded-md border transition-colors hover:bg-accent"
            >
             <SiFacebook className="size-4" aria-hidden="true" />
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex size-10 items-center justify-center rounded-md border transition-colors hover:bg-accent"
            >
              <SiInstagram className="size-4" aria-hidden="true" />
            </a>

            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="flex size-10 items-center justify-center rounded-md border transition-colors hover:bg-accent"
            >
            <SiX className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t px-4 py-5 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} BookNook. All rights reserved.
      </div>
    </footer>
  );
}