"use client";

import { signOut } from "next-auth/react";

const SignOutButton = () => {
  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/auth/signin" });
  };

  return (
    <button onClick={handleSignOut} className="bg-gray-900 text-white px-4 p-2">
      Sign Out
    </button>
  );
};

export default SignOutButton;
