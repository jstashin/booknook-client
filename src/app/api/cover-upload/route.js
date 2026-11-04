import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
      query: { disableCookieCache: true },
    });

    if (!session?.user) {
      return Response.json(
        { message: "Please log in to upload a cover." },
        { status: 401 }
      );
    }

    const origin = new URL(process.env.BETTER_AUTH_URL).origin;

    if (request.headers.get("origin") !== origin) {
      return Response.json(
        { message: "Invalid request origin." },
        { status: 403 }
      );
    }

    const apiKey = process.env.IMGBB_API_KEY;

    if (!apiKey) {
      return Response.json(
        { message: "ImgBB API key is missing." },
        { status: 503 }
      );
    }

    const formData = await request.formData();
    const cover = formData.get("cover");
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (
      !(cover instanceof File) ||
      cover.size === 0 ||
      cover.size > 2_000_000 ||
      !allowedTypes.includes(cover.type)
    ) {
      return Response.json(
        { message: "Choose a JPG, PNG, or WebP cover up to 2 MB." },
        { status: 400 }
      );
    }

    const uploadData = new FormData();
    uploadData.set("image", cover);

    const uploadUrl = new URL("https://api.imgbb.com/1/upload");
    uploadUrl.searchParams.set("key", apiKey);

    const response = await fetch(uploadUrl, {
      method: "POST",
      body: uploadData,
      signal: AbortSignal.timeout(20_000),
    });

    const result = await response.json();

    if (!response.ok || !result.success || !result.data?.url) {
      return Response.json(
        { message: "ImgBB could not upload the cover." },
        { status: 502 }
      );
    }

    return Response.json({ image: result.data.url });
  } catch {
    return Response.json(
      { message: "Cover upload failed. Please try again." },
      { status: 500 }
    );
  }
}