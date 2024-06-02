"use server";

import dbConnect from "@/utils/db/dbConnect";
import User from "@/utils/db/models/user.model";

export const verifyToken = async (token, userId) => {
  await dbConnect();
  const user = await User.findById(userId);
  if (!user) {
    return {
      status: 404,
      message: "User not found",
    };
  }
  const currentTime = new Date().getTime();
  console.log("Token ", token);
  console.log("Token ", user.verificationToken);
  if (
    token == user.verificationToken &&
    currentTime < parseInt(user.verificationTokenExpiry)
  ) {
    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpiry = null;
    await user.save();
    return {
      status: 200,
      message: "Verification successful",
    };
  } else {
    return {
      status: 501,
      message: "Some Error occured",
    };
  }
};
