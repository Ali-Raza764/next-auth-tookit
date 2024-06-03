"use client";

import { createCheckout } from "@/actions/stripe/sessions.actions";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const BuyButton = () => {
  const handleCheckout = async () => {
    const response = await createCheckout("Expensive product", 3000, 1);
    window.location.href = (response.checkoutUrl);
  };
  return (
    <button
      className="p-3 bg-black text-white rounded-md"
      onClick={handleCheckout}
    >
      BuyButton
    </button>
  );
};

export default BuyButton;
