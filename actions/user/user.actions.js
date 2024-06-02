"use server";

import User from "@/utils/db/models/user.model";
import dbConnect from "@/utils/db/dbConnect";
import bcrypt from "bcrypt";

export const oauthSignIn = async (payload) => {
  const conn = await dbConnect();
  const { email } = payload;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return {
      success: true,
      status: 200,
      data: existingUser,
    };
  } else {
    const user = await User.create(payload);
    return {
      success: true,
      status: 200,
      data: user,
    };
  }
};
export const SignInWithEmailAndPassword = async (payload) => {
  const conn = await dbConnect();
  const { email, password } = payload;

  const user = await User.findOne({ email });
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (isPasswordValid) {
    return {
      success: true,
      status: 200,
      data: user,
    };
  } else {
    return {
      success: false,
      status: 400,
      message: "Invalid credentials",
    };
  }
};

export const SignUpWithEmailAndPassword = async (payload) => {
  const conn = await dbConnect();
  const { email, name, password } = payload;

  const hashedPassword = await bcrypt.hash(password, 10);
  const userData = {
    name,
    email,
    password: hashedPassword,
    authType: payload.authType,
  };

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return {
      success: false,
      status: 400,
      message: "User already exists",
    };
  }

  const user = User.create(userData);

  if (user) {
    return {
      success: true,
      status: 200,
      data: user,
    };
  } else {
    return {
      success: false,
      status: 500,
      message: "Error occurred while creating user",
    };
  }
};


export const updateUser = async (id, payload) => {
  const conn = await dbConnect();
  const user = await User.findByIdAndUpdate(id, payload);
  if (user) {
    return {
      success: true,
      status: 200,
      data: user,
    };
  } else {
    return {
      success: false,
      status: 500,
      message: "Error occurred while updating user",
    };
  }
}