'use server';

// We use the exact path that we know works from your page.tsx!
import { signIn, signOut } from "@/server/auth";

export async function googleSignInAction() {
    // You can change the redirectTo path to wherever users should land after logging in
    await signIn('google', { redirectTo: '/' });
}

export async function signOutAction() {
    await signOut({ redirectTo: '/' });
}