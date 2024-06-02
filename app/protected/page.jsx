import { auth } from "@/auth";
import React from "react";
import SignOutButton from "../auth/components/SignOut";
import { redirect } from "next/navigation";

const Protected = async () => {
  const session = await auth();
  console.log(session);
  if (!session.user.isVerified) {
    redirect("/auth/verify");
  }
  return (
    <div>
      {JSON.stringify(session)}
      <SignOutButton />
    </div>
  );
};

export default Protected;
