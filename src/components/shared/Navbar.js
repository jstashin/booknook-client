"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Menu } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "All Books", href: "/books" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function navLinkClass(href) {
    return `rounded-md px-4 py-2 text-sm font-medium transition-colors ${
      isActive(href)
        ? "bg-accent text-accent-foreground"
        : "text-muted-foreground hover:bg-accent hover:text-foreground"
    }`;
  }

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-2"
        >
          <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BookOpen className="size-6" aria-hidden="true" />
          </span>

          <span className="text-2xl font-bold tracking-tight">
            BookNook
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-2 md:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={navLinkClass(link.href)}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.title}
            </Link>
          ))}
        </nav>

        {/* Desktop authentication links */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className={buttonVariants({ variant: "ghost" })}
          >
            Login
          </Link>

          <Link
            href="/register"
            className={buttonVariants({ variant: "default" })}
          >
            Register
          </Link>
        </div>

        {/* Mobile navigation */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Open navigation menu"
              className={buttonVariants({
                variant: "outline",
                size: "icon",
              })}
            >
              <Menu className="size-5" aria-hidden="true" />
            </SheetTrigger>

            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <BookOpen
                    className="size-5"
                    aria-hidden="true"
                  />
                  BookNook
                </SheetTitle>

                <SheetDescription>
                  Explore the library or sign in to your account.
                </SheetDescription>
              </SheetHeader>

              <nav
                aria-label="Mobile navigation"
                className="flex flex-col gap-2 px-4 pb-6"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={navLinkClass(link.href)}
                    aria-current={
                      isActive(link.href) ? "page" : undefined
                    }
                  >
                    {link.title}
                  </Link>
                ))}

                <div className="mt-4 flex flex-col gap-3 border-t pt-5">
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className={buttonVariants({
                      variant: "outline",
                    })}
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    onClick={closeMenu}
                    className={buttonVariants({
                      variant: "default",
                    })}
                  >
                    Register
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}