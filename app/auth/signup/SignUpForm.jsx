import React from "react";
// import Providers from "../components/Providers";
import { signIn } from "@/auth";
import { SignUpWithEmailAndPassword } from "@/actions/user.actions";
import Link from "next/link";

const SignUpForm = () => {
  return (
    <div className="shadow bg-gray-400 p-4 rounded-md m-2 ">
      <form action={SignUpWithEmailAndPassword} className="flex flex-col gap-4 p-2">
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="border-b-2 border-gray-400 focus:border-red-500 outline-none  p-2 transition"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border-b-2 border-gray-400 focus:border-red-500 outline-none  p-2 transition"
        />
        <button
          type="submit"
          className="p-2 px-4 bg-gray-800 rounded-md text-white"
        >
          Submit
        </button>
      </form>
      <Link href="/auth/signin">SignIn</Link>
    </div>
  );
};

export default SignUpForm;
