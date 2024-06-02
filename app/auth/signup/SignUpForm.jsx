"use client";
import { SignUpWithEmailAndPassword } from "@/actions/user/user.actions";
import Link from "next/link";
import Providers from "../components/Providers";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: e.target.email.value,
      name: e.target.name.value,
      password: e.target.password.value,
      authType: "credentials",
    };
    try {
      setLoading(true);
      setError("");
      const res = await SignUpWithEmailAndPassword(payload);
      console.log(res);
      if (res.status == 400) {
        setError(res.message);
      }
      if (res.status == 200) {
        router.push("/auth/signin");
      }
    } catch (error) {
      console.error;
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
          type="text"
          name="name"
          placeholder="Name"
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
        <p className="text-lf text-red-500 h-5">{error}</p>
        <button
          type="submit"
          className="p-2 px-4 bg-gray-800 rounded-md text-white disabled:border-none disabled:bg-gray-600"
          disabled={loading}
        >
          Submit
        </button>
      </form>
      <div className="my-2 w-full text-center">Or</div>
      <div className="w-full">
        <Providers />
      </div>
      <Link href="/auth/signin">SignIn</Link>
    </div>
  );
};

export default SignUpForm;
