"use client";

import { authClient } from "@/lib/auth-client";

export async function getTokenFromClient() {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new Error("Could not verify your login. Please log in again.");
  }

  return data.token;
}