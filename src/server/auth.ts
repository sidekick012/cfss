import NextAuth from "next-auth";
import Apple from "next-auth/providers/apple";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  trustHost: true,
  debug: true,   // keep until everything works

  adapter: DrizzleAdapter(db),

  providers: [
    // Apple first — as you requested
    Apple({
      clientId: process.env.AUTH_APPLE_ID!,
      teamId: process.env.AUTH_APPLE_TEAM_ID!,
      keyId: process.env.AUTH_APPLE_KEY_ID!,
      // The .replace ensures that if Cloudflare escapes the \n, we parse it back into real line breaks for the crypto generator
      privateKey: process.env.AUTH_APPLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      authorization: {
        params: {
          scope: "name email",
          response_mode: "form_post",
        },
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
});