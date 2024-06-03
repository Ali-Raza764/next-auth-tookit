import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export async function POST(req, res) {
  const payload = await req.text();
  const response = JSON.parse(payload);

  const sig = req.headers.get("Stripe-Signature");

  const dateTime = new Date(response?.created * 1000).toLocaleDateString();
  const timeString = new Date(response?.created * 1000).toLocaleDateString();

  try {
    let event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log("event:", event.type, event.data); //checkout.session.completed holds the metadata

    return NextResponse.json({
      status: "success",
      event: event.type,
    });
  } catch (error) {
    return NextResponse.json({ error: "Error" });
  }
}
