import React from "react";
import Providers from "../components/Providers";

const SignInFrom = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
  };

  return (
    <div className="w-32 h-auto flex items-center flex-col shadow">
      <form action="" onClick={handleSubmit} className="flex flex-col">
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="w-full h-8 px-4 mb-4"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full h-8 px-4 mb-4"
        />
      </form>
      <Providers />
    </div>
  );
};

export default SignInFrom;
