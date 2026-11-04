"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { getTokenFromClient } from "@/lib/getTokenFromClient";

const categories = ["Fiction", "Science", "History", "Kids", "Others"];

const inputClass =
  "block w-full rounded-md border border-input bg-background px-3 py-2 text-sm";

export default function AddBookForm({ name, email }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (saving) return;

    const form = new FormData(event.currentTarget);
    const cover = form.get("cover");

    if (!cover?.size || cover.size > 2_000_000) {
      toast.error("Choose a cover image up to 2 MB.");
      return;
    }

    setSaving(true);

    try {
      const token = await getTokenFromClient();

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

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/books`,
        {
          method: "POST",
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
            image: upload.image,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.insertedId) {
        throw new Error(result.message || "Could not save the book.");
      }

      toast.success("Book added successfully.");
      router.push(`/books/${result.insertedId}`);
    } catch (error) {
      toast.error(error.message || "Could not add the book.");
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
        <span>Book Title</span>
        <input name="title" required maxLength={150} className={inputClass} />
      </label>

      <label className="block space-y-2">
        <span>Author Name</span>
        <input name="author" required maxLength={100} className={inputClass} />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block space-y-2">
          <span>Category</span>
          <select name="category" defaultValue="" required className={inputClass}>
            <option value="" disabled>Choose a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </label>

        <label className="block space-y-2">
          <span>Total Copies</span>
          <input
            name="totalCopies"
            type="number"
            min={1}
            max={10000}
            defaultValue={1}
            required
            className={inputClass}
          />
        </label>
      </div>

      <label className="block space-y-2">
        <span>Book Cover</span>
        <input
          name="cover"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          required
          className={inputClass}
        />
        <span className="block text-xs text-muted-foreground">
          JPG, PNG or WebP up to 2 MB.
        </span>
      </label>

      <label className="block space-y-2">
        <span>Short Description</span>
        <textarea
          name="description"
          rows={4}
          maxLength={2000}
          required
          className={inputClass}
        />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block space-y-2">
          <span>Your Name</span>
          <input value={name} readOnly className={inputClass} />
        </label>

        <label className="block space-y-2">
          <span>Your Email</span>
          <input value={email} readOnly className={inputClass} />
        </label>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-60"
      >
        {saving ? "Uploading and saving..." : "Add Book"}
      </button>
    </form>
  );
}