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
	adapter: DrizzleAdapter(db),
	providers: [
		Apple({
			clientId: process.env.APPLE_CLIENT_ID!,
			clientSecret: {
				appleId: process.env.APPLE_ID!,
				privateKey: process.env.APPLE_PRIVATE_KEY!,
				keyId: process.env.APPLE_KEY_ID!,
			},
		}),
		Google
	],
});