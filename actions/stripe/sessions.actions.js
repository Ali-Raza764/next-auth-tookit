"use server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckout = async (name, unitPrice, quantity) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: name,

            images: [
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLR16QNX1UyHYQVvchvpDkX9f5sVzhSE5IAQ&s",
            ],
          },
          unit_amount: unitPrice, // Price in cents
        },
        quantity: quantity,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:3000/success`,
    cancel_url: `http://localhost:3000/success`,
  });
  return {
    status: 200,
    checkoutUrl: session.url,
  };
};
