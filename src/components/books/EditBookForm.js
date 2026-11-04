"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

const fieldClass =
  "block w-full rounded-md border border-input bg-background px-3 py-2 text-sm";

export default function EditBookForm({ book }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (saving) return;

    const form = new FormData(event.currentTarget);
    const cover = form.get("cover");

    if (cover?.size > 2_000_000) {
      toast.error("Choose a cover image up to 2 MB.");
      return;
    }

    setSaving(true);

    try {
      const token = await getTokenFromClient();
      let image = book.image;

      if (cover?.size) {
        const uploadForm = new FormData();
        uploadForm.set("cover", cover);

        const uploadResponse = await fetch("/api/cover-upload", {
          method: "POST",
          body: uploadForm,
        });

        const upload = await uploadResponse.json();

        if (!uploadResponse.ok || !upload.image) {
          throw new Error(upload.message || "Could not upload the cover.");
        }

        image = upload.image;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/books/${book._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: form.get("title").trim(),
            author: form.get("author").trim(),
            category: form.get("category"),
            description: form.get("description").trim(),
            totalCopies: Number(form.get("totalCopies")),
            image,
          }),
        }
      );

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Could not update the book.");
      }

      toast.success("Book updated successfully.");
      router.replace("/my-books");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Could not update the book.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 space-y-5 rounded-xl border bg-card p-6"
    >
      <label className="block space-y-2">
        <span className="text-sm font-medium">Book Title</span>
        <input
          name="title"
          defaultValue={book.title}
          maxLength={150}
          required
          className={fieldClass}
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium">Author Name</span>
        <input
          name="author"
          defaultValue={book.author}
          maxLength={100}
          required
          className={fieldClass}
        />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm font-medium">Category</span>
          <select
            name="category"
            defaultValue={book.category}
            required
            className={fieldClass}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium">Total Copies</span>
          <input
            name="totalCopies"
            type="number"
            min={1}
            max={10000}
            step={1}
            defaultValue={book.totalCopies}
            required
            className={fieldClass}
          />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-sm font-medium">Replace Cover (optional)</span>
        <input
          name="cover"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className={fieldClass}
        />
        <span className="block text-xs text-muted-foreground">
          Leave this empty to keep the current cover.
        </span>
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium">Short Description</span>
        <textarea
          name="description"
          defaultValue={book.description}
          rows={4}
          maxLength={2000}
          required
          className={fieldClass}
        />
      </label>

      <button
        type="submit"
        disabled={saving}
        className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}