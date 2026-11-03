import "server-only";

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";
import { jwt } from "better-auth/plugins";
import { APIError, createAuthMiddleware } from "better-auth/api";

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is missing from frontend .env");
}

// Reuse the client during development hot reloads.
const client =
  globalThis.booknookMongoClient ||
  new MongoClient(process.env.MONGODB_URI);

if (process.env.NODE_ENV !== "production") {
  globalThis.booknookMongoClient = client;
}

const db = client.db("booknook");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,

  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    maxPasswordLength: 128,
    autoSignIn: false,
    requireEmailVerification: false,
  },

  plugins: [jwt()],

  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-up/email") {
        return;
      }

      const password = ctx.body?.password;

      if (
        typeof password !== "string" ||
        password.length < 6 ||
        !/[A-Z]/.test(password) ||
        !/[a-z]/.test(password)
      ) {
        throw new APIError("BAD_REQUEST", {
          message:
            "Password must have at least 6 characters, an uppercase letter, and a lowercase letter.",
        });
      }
    }),
  },
});