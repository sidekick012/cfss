import NextAuth from "next-auth";
import Apple from "next-auth/providers/apple";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { getDb } from "./db";

export const {
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({
  trustHost: true,
  debug: true,
  adapter: DrizzleAdapter(getDb()),
  providers: [
    Apple({
      clientId: process.env.AUTH_APPLE_ID!,
      clientSecret: process.env.AUTH_APPLE_SECRET!,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("signIn callback", { user, account, profile });
      return true;
    },
  },
  logger: {
    error(code, ...message) {
      console.error("AUTH ERROR:", code, message);
    },
    warn(code, ...message) {
      console.warn("AUTH WARN:", code, message);
    },
    debug(code, ...message) {
      console.log("AUTH DEBUG:", code, message);
    },
  },
});