import { NextResponse } from "next/server";
import { auth } from "@/server/auth"; // Adjust this path if your auth.ts is located elsewhere
import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28",
});

export async function POST(req: Request) {
  try {
    // 1. Verify the user is actually logged in
    const session = await auth();
    
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 2. Ask Stripe to build a customized checkout page
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card", "link"],
      customer_email: session.user.email, // Pre-fills their email on the checkout screen!
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      // 3. Where Stripe sends them after the transaction
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/?canceled=true`,
    });

    // 4. Send the unique Stripe URL back to your frontend
    return NextResponse.json({ url: checkoutSession.url });

  } catch (error) {
    console.error("[STRIPE_CHECKOUT_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}