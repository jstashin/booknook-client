import "server-only";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getTokenFromServer() {
  const result = await auth.api.getToken({
    headers: await headers(),
  });

  if (!result?.token) {
    throw new Error("Could not verify your login.");
  }

  return result.token;
}