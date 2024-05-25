import { auth } from "@/auth";
import React from "react";
import SignOutButton from "../auth/components/SignOut";

const Protected = async () => {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}
      <SignOutButton />
    </div>
  );
};

export default Protected;
