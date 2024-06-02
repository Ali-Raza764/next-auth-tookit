import { auth, unstable_update } from "@/auth"; // Correctly import unstable_update
import User from "@/utils/db/models/user.model";
import { NextResponse } from "next/server";
import dbConnect from "@/utils/db/dbConnect";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    console.log("token", token);

    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const userId = session.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const currentTime = new Date().getTime();

    if (token === user.verificationToken && currentTime < user.verificationTokenExpiry) {
      user.isVerified = true;
      await user.save();

      // Update the session and token with the new isVerified status
      await unstable_update({ ...session, user: { ...session.user, isVerified: true } });

      console.log("Route Session", session.user);

      return NextResponse.json({ message: "Verification successful" });
    }

    return NextResponse.json({ message: "Verification failed" }, { status: 400 });
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}