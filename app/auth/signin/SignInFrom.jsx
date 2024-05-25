"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Providers from "../components/Providers";

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      setLoading(true);
      setError("");
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      //* The res here has no credentials data only error:true or error:null so we can manage the state based on that
      //* Next auth does not send the data due to security reasons
      if (res.error === null) {
        router.push("/protected");
      }
      if (res.error) {
        setError("Check Your Email Or Password");
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shadow bg-gray-400 p-4 rounded-md m-2 min-w-[20rem]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="border-b-2 border-gray-400 focus:border-red-500 outline-none  p-2 transition disabled:border-none disabled:bg-gray-400"
          required
          disabled={loading}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border-b-2 border-gray-400 focus:border-red-500 outline-none  p-2 transition disabled:border-none disabled:bg-gray-400"
          required
          disabled={loading}
        />
        <p className="text-red-500">{error}</p>
        <button
          type="submit"
          className="p-2 px-4 bg-gray-800 rounded-md text-white disabled:border-none disabled:bg-gray-600"
          disabled={loading}
        >
          Submit
        </button>
      </form>
      <div className="my-2 w-full text-center"> Or</div>
      <div className="w-full">
        <Providers />
      </div>
      <Link href="/auth/signup">SignUp</Link>
    </div>
  );
};

export default SignInForm;
