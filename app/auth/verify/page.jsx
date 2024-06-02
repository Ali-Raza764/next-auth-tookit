import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
import dbConnect from "@/utils/db/dbConnect";
import User from "@/utils/db/models/user.model";
import SendVerficationEmail from "@/actions/resend.actions";

const generateToken = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  const charactersLength = characters.length;

  for (let i = 0; i < charactersLength; i++) {
    token += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return token;
};

const getTokenFromDataBase = async (userId) => {
  await dbConnect();
  const user = await User.findById(userId);
  if (user) {
    //* First we will check our database for existing tokens
    const token = user.verificationToken;
    const expiry = user.verificationTokenExpiry;

    if (token && expiry) {
      //* Token must not be empty
      const isTokenValid = new Date().getTime() < parseInt(expiry); //* Current time must be less than Token expiry
      if (isTokenValid) return token; //* If token is valid then return it instantly
    }

    //* If Token is not valid or empty we will create a now one and write it into our database
    const newToken = generateToken();
    const currentTime = new Date().getTime();
    const newTokenExpiry = currentTime + 1000 * 60 * 60 * 24;
    user.verificationToken = newToken;
    user.verificationTokenExpiry = newTokenExpiry;
    await user.save();
    return newToken;
  }
};

const page = async () => {
  const session = await auth();
  if (!session) {
    redirect("/"); //* redirect If user is not logged in
  }
  const userId = session.user.id;

  const token = await getTokenFromDataBase(userId); //* get the token
  const link = `http:localhost:3000/api/verifyemail?token=${token}`;
  console.log(link);
  const res = await SendVerficationEmail(session?.user?.email, link);
  console.log(res);

  if (res.status === 200) {
    return (
      <main className="w-full min-h-screen flex items-center justify-center">
        <h1 className="">Email Sent Successfully</h1>
        <p>We have sent you your email verification link. Ckeck Your Inbox</p>
      </main>
    );
  }
  return (
    <main className="w-full min-h-screen">
      Some Error Occured Please Try refreshing the page
    </main>
  );
};

export default page;
