import React from "react";
import SignUpForm from "./SignUpForm";

const SignUp = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">SignUp</h1>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
