"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BookOpen, Menu } from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { buttonVariants } from "@/components/ui/button";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const publicLinks = [
  { title: "Home", href: "/" },
  { title: "All Books", href: "/books" },
];

const privateLinks = [
  { title: "Add Book", href: "/add-book" },
  { title: "My Books", href: "/my-books" },
  { title: "My Borrows", href: "/my-borrows" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const {
    data: session,
    isPending,
    error,
    refetch,
  } = authClient.useSession();

  const user = session?.user;

  const navLinks = user
    ? [...publicLinks, ...privateLinks]
    : publicLinks;

  function closeMenu() {
    setOpen(false);
  }

  function isActive(href) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function navLinkClass(href) {
    return `whitespace-nowrap rounded-md px-2 py-2 text-sm font-medium transition-colors lg:px-3 ${
      isActive(href)
        ? "bg-accent text-accent-foreground"
        : "text-muted-foreground hover:bg-accent hover:text-foreground"
    }`;
  }

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error(result.error.message || "Logout failed.");
        return;
      }

      closeMenu();
      toast.success("You have been logged out.");

      router.replace("/");
      router.refresh();
    } catch {
      toast.error("Could not log out. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  }

  function renderAccount() {
    if (isPending) {
      return (
        <div role="status" className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="size-5 animate-spin rounded-full border-2 border-muted border-t-primary"
          />

          <span className="sr-only">Loading account...</span>
        </div>
      );
    }

    if (error) {
      return (
        <button
          type="button"
          onClick={() => refetch()}
          className="text-sm text-destructive underline"
        >
          Retry account
        </button>
      );
    }

    if (!user) {
      return (
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            onClick={closeMenu}
            className={buttonVariants({ variant: "ghost" })}
          >
            Login
          </Link>

          <Link
            href="/register"
            onClick={closeMenu}
            className={buttonVariants()}
          >
            Register
          </Link>
        </div>
      );
    }

    return (
      <details className="relative">
        <summary
          aria-label="Open account menu"
          className="cursor-pointer list-none rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 [&::-webkit-details-marker]:hidden"
        >
          <Avatar className="size-10">
            <AvatarImage
              src={user.image || undefined}
              alt={user.name || "Your profile"}
            />

            <AvatarFallback>
              {user.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </summary>

        <div className="absolute right-0 top-full z-50 mt-3 w-60 rounded-lg border bg-popover p-3 text-popover-foreground shadow-lg">
          <div className="border-b px-2 pb-3">
            <p className="truncate text-sm font-semibold">
              {user.name}
            </p>

            <p className="mt-1 truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>

          <Link
            href="/profile"
            onClick={(event) => {
              event.currentTarget
                .closest("details")
                ?.removeAttribute("open");

              closeMenu();
            }}
            className="mt-2 block rounded-md px-2 py-2 text-sm hover:bg-accent"
          >
            My Profile
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="block w-full rounded-md px-2 py-2 text-left text-sm text-destructive hover:bg-accent disabled:opacity-50"
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </details>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-2"
        >
          <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BookOpen className="size-6" aria-hidden="true" />
          </span>

          <span className="text-xl font-bold tracking-tight lg:text-2xl">
            BookNook
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 md:flex"
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

        {/* Desktop account */}
        <div className="hidden shrink-0 md:block">
          {renderAccount()}
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

            <SheetContent side="right" className="w-80 max-w-[90vw]">
              <SheetHeader>
                <SheetTitle>BookNook</SheetTitle>

                <SheetDescription>
                  Explore the library and manage your books.
                </SheetDescription>
              </SheetHeader>

              <nav
                aria-label="Mobile navigation"
                className="flex flex-col gap-2 px-4"
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
              </nav>

              <div className="mx-4 mt-4 flex justify-end border-t pt-5">
                {renderAccount()}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}