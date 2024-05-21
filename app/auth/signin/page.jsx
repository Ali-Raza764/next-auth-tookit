import React from "react";
import SignInFrom from "./SignInFrom";

const SignIn = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">SignIn</h1>
      <SignInFrom />
    </div>
  );
};

export default SignIn;
