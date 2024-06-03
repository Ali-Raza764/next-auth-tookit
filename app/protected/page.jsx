import { auth } from "@/auth";
import React from "react";
import SignOutButton from "../auth/components/SignOut";
import { redirect } from "next/navigation";
import BuyButton from "./BuyButton";

const Protected = async () => {
  const session = await auth();
  console.log(session);
  if (!session.user.isVerified) {
    redirect("/auth/verify");
  }
  return (
    <div className="p-6">
      <div className="flex mb-6">
        {JSON.stringify(session)}
        <SignOutButton />
      </div>
      <div>
        <h1>Buy Product Now</h1>
        <BuyButton />
      </div>
    </div>
  );
};

export default Protected;
