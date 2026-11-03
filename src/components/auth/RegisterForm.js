"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

export default function RegisterForm() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister(event) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const image = String(formData.get("image") || "").trim();
    const password = String(formData.get("password") || "");

    if (!name) {
      setError("Please enter your name.");
      return;
    }

    if (
      password.length < 6 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password)
    ) {
      setError(
        "Password must contain at least 6 characters, an uppercase letter, and a lowercase letter."
      );
      return;
    }

    try {
      const photoUrl = new URL(image);

      if (!["https:", "http:"].includes(photoUrl.protocol)) {
        setError("Please enter a valid HTTP or HTTPS photo URL.");
        return;
      }
    } catch {
      setError("Please enter a valid photo URL.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await authClient.signUp.email({
        name,
        email,
        image,
        password,
      });

      if (result.error) {
        const message =
          result.error.message || "Registration failed. Please try again.";

        setError(message);
        toast.error(message);
        return;
      }

      toast.success("Registration completed. Please log in.");

      router.push("/login");
    } catch {
      const message = "Could not connect. Please try again.";

      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass =
    "h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm sm:p-8">
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-bold">Join BookNook</h1>

          <p className="mt-3 text-sm text-muted-foreground">
            Create an account and discover your next favorite book.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              maxLength={100}
              required
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="image" className="text-sm font-medium">
              Photo URL
            </label>

            <input
              id="image"
              name="image"
              type="url"
              placeholder="https://example.com/photo.jpg"
              required
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="Create a password"
              minLength={6}
              maxLength={128}
              aria-describedby="password-help"
              required
              className={inputClass}
            />

            <p
              id="password-help"
              className="text-xs leading-5 text-muted-foreground"
            >
              Use at least 6 characters with an uppercase and a lowercase
              letter.
            </p>
          </div>

          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-foreground underline underline-offset-4"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}