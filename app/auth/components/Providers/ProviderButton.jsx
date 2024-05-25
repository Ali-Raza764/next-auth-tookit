import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaSpinner } from "react-icons/fa";
import { signIn } from "next-auth/react";

const ProviderButton = ({ id, name }) => {
  const [loading, setLoading] = useState(false);
  return (
    <button
      className="w-full bg-gray-800 p-2 rounded-md text-white flex items-center gap-2"
      onClick={() => {
        setLoading(true);
        signIn(id);
      }}
    >
      {id == "google" ? <FcGoogle size={30} /> : <FaGithub size={30} />}{" "}
      Continue With {name}
      {loading && <FaSpinner size={30} className="animate-spin" />}
    </button>
  );
};
export default ProviderButton;
