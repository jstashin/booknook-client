"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { booksApi } from "@/lib/books-api";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const buttonClass =
  "rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50";

const fieldClass =
  "mt-1 block w-full rounded-md border bg-background p-2";

export default function BookLoanButton({
  action,
  id,
  title,
  name,
  email,
  unavailable = false,
}) {
  const dialog = useRef(null);
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const borrowing = action === "borrow";
  const buttonLabel = borrowing ? "Borrow This Book" : "Return Book";
  const confirmLabel = borrowing ? "Confirm Borrow" : "Confirm Return";

  async function handleConfirm(event) {
    event.preventDefault();

    if (busy) return;

    setBusy(true);

    try {
      const token = await getTokenFromClient();

      if (borrowing) {
        await booksApi("/borrows", {
          token,
          method: "POST",
          body: { bookId: id },
        });
      } else {
        await booksApi(`/borrows/${id}`, {
          token,
          method: "DELETE",
        });
      }

      dialog.current?.close();

      toast.success(
        borrowing
          ? "Book borrowed for 14 days."
          : "Book returned successfully."
      );

      router.refresh();
    } catch (error) {
      toast.error(error.message || "Could not complete the request.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        type="button"
        disabled={unavailable}
        onClick={() => dialog.current?.showModal()}
        className={buttonClass}
      >
        {unavailable ? "Not Available" : buttonLabel}
      </button>

      <dialog
        ref={dialog}
        aria-label={confirmLabel}
        onCancel={(event) => {
          if (busy) event.preventDefault();
        }}
        className="m-auto w-[min(90vw,28rem)] rounded-xl border bg-card p-6 text-card-foreground backdrop:bg-black/50"
      >
        <form onSubmit={handleConfirm} className="space-y-4">
          <h2 className="text-xl font-semibold">{confirmLabel}</h2>

          <p className="whitespace-normal text-sm">{title}</p>

          {borrowing && (
            <div className="space-y-3">
              <label className="block text-sm">
                Your Name
                <input value={name} readOnly className={fieldClass} />
              </label>

              <label className="block text-sm">
                Your Email
                <input value={email} readOnly className={fieldClass} />
              </label>

              <p className="text-sm text-muted-foreground">
                Your loan is due in 14 days.
              </p>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              disabled={busy}
              onClick={() => dialog.current?.close()}
              className="rounded-md border px-4 py-2 text-sm"
            >
              Cancel
            </button>

            <button type="submit" disabled={busy} className={buttonClass}>
              {busy ? "Working..." : confirmLabel}
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}