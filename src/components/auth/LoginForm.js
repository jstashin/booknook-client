"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import GoogleSignIn from "@/components/auth/GoogleSignIn";
import { authClient } from "@/lib/auth-client";

export default function LoginForm() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    try {
      const result = await authClient.signIn.email({
        email,
        password,
        rememberMe: true,
      });

      if (result.error) {
        const message =
          result.error.message || "Login failed. Please try again.";

        setError(message);
        toast.error(message);
        return;
      }

      const params = new URLSearchParams(window.location.search);
      const requestedPath = params.get("next");

      let destination = "/";

      if (requestedPath) {
        const target = new URL(requestedPath, window.location.origin);

        // Allow redirects only within this website.
        if (
          target.origin === window.location.origin &&
          !["/login", "/register"].includes(target.pathname)
        ) {
          destination = target.pathname + target.search + target.hash;
        }
      }

      toast.success("Welcome back to BookNook!");

      router.replace(destination);
      router.refresh();
    } catch {
      const message = "Login could not be completed. Please try again.";

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
          <h1 className="text-3xl font-bold">Welcome Back</h1>

          <p className="mt-3 text-sm text-muted-foreground">
            Login to find your next favorite book.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
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
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              required
              className={inputClass}
            />
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={() =>
                toast.info(
                  "Password reset is not enabled for this assignment."
                )
              }
              className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              Forgot Password?
            </button>
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
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
        <GoogleSignIn />

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-foreground underline underline-offset-4"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}