"use client";

import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function GoogleSignIn({ fromRegister = false }) {
  const [loading, setLoading] = useState(false);

  async function handleGoogleSignIn() {
    if (loading) return;
    setLoading(true);

    try {
      const origin = window.location.origin;
      const params = new URLSearchParams(window.location.search);
      const next = params.get("next");
      let destination = new URL("/", origin);

      if (!fromRegister && next?.startsWith("/") && !next.startsWith("//")) {
        const target = new URL(next, origin);

        if (
          target.origin === origin &&
          !["/login", "/register"].includes(target.pathname)
        ) {
          destination = target;
        }
      }

      const errorPage = new URL(
        fromRegister ? "/register" : "/login",
        origin
      );
      errorPage.searchParams.set("googleError", "1");

      if (!fromRegister && destination.pathname !== "/") {
        errorPage.searchParams.set(
          "next",
          destination.pathname + destination.search + destination.hash
        );
      }

      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: destination.href,
        errorCallbackURL: errorPage.href,
      });

      if (result.error) {
        throw new Error(result.error.message || "Google sign-in failed.");
      }
    } catch (error) {
      toast.error(error.message || "Could not connect to Google.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-5">
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="h-11 w-full rounded-md border px-4 text-sm font-medium hover:bg-accent disabled:opacity-60"
      >
        {loading ? "Connecting to Google..." : "Continue with Google"}
      </button>
    </div>
  );
}