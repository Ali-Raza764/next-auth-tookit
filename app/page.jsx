import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen w-full py-11">
      <h1 className="w-full text-center text-4xl font-bold font-sans">
        Authentication System using Nextauth and mongodb{" "}
      </h1>
      <div className="container mt-11 flex gap-8 items-center justify-center">
        <Link
          href="/auth/signin"
          className="px-4 p-2 bg-gray-800 hover:bg-gray-700 transition rounded-md text-white"
        >
          SignIn
        </Link>
        <Link
          href="/auth/signup"
          className="px-4 p-2 bg-gray-800 hover:bg-gray-700 transition rounded-md text-white"
        >
          SignUp
        </Link>
        <Link
          href="/auth/admin"
          className="px-4 p-2 bg-gray-800 hover:bg-gray-700 transition rounded-md text-white"
        >
          Protected
        </Link>
      </div>
    </div>
  );
};

export default Home;
