"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

export default function DeleteBookButton({ id, title }) {
  const dialog = useRef(null);
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete(event) {
    event.preventDefault();

    if (deleting) return;
    setDeleting(true);

    try {
      const token = await getTokenFromClient();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/books/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Could not delete the book.");
      }

      dialog.current.close();
      toast.success("Book deleted successfully.");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Could not delete the book.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current.showModal()}
        className="rounded-md border px-4 py-2 text-sm font-medium text-destructive hover:bg-accent"
      >
        Delete
      </button>

      <dialog
        ref={dialog}
        aria-label="Confirm book deletion"
        className="m-auto w-[min(90vw,28rem)] rounded-xl border bg-card p-6 text-card-foreground backdrop:bg-black/50"
      >
        <form onSubmit={handleDelete} className="space-y-4">
          <h2 className="text-xl font-semibold">Delete this book?</h2>

          <p className="text-sm text-muted-foreground">
            “{title}” will be removed from BookNook.
          </p>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              disabled={deleting}
              onClick={() => dialog.current.close()}
              className="rounded-md border px-4 py-2 text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={deleting}
              className="rounded-md bg-destructive px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
            >
              {deleting ? "Deleting..." : "Confirm Delete"}
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}