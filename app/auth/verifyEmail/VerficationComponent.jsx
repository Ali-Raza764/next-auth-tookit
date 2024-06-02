"use client";
import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { signOut } from "next-auth/react";

const handleSignOut = async () => {
  await signOut({ redirect: true, callbackUrl: "/auth/signin" });
};
const VerficationComponent = () => {
  useEffect(() => {
    handleSignOut();
  }, []);
  return <FaSpinner size={50} className="animate-spin" color="#00BFFF" />;
};

export default VerficationComponent;
