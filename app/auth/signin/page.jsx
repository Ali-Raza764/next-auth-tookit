import React from "react";
import SignInFrom from "./SignInFrom";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const SignIn = async() => {
  const session = await auth();

  if (session != null) {
    redirect("/protected");
  }

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">SignIn</h1>
      <SignInFrom />
    </div>
  );
};

export default SignIn;
