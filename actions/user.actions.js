"use server";
import dbConnect from "@/utils/db/dbConnect";
import User from "@/utils/db/models/user.model";

export const SignInWithEmailAndPassword = async (payload) => {
  const email = payload.get("email");
  const password = payload.get("password");
  console.log(email, password);

  const conn = await dbConnect();

  //* Check if email and password are provided
  if (!email || !password) {
    return JSON.parse(
      JSON.stringify({
        success: false,
        status: 400,
        message: "Invalid credentials",
      })
    );
  }

  //* Find the user in the database
  const user = await User.findOne({ email });

  //* If user is not found, return an error
  if (!user) {
    return JSON.parse(
      JSON.stringify({
        success: false,
        status: 400,
        message: "Invalid credentials",
      })
    );
  }

  // * Check If the password matches
  // const isPasswordValid = await bcrypt.compare(password, user.password);
  const isPasswordValid = password === user.password;

  if (isPasswordValid) {
    console.log("Password is valid");
    return JSON.parse(
      JSON.stringify({
        success: true,
        status: 200,
        data: user,
      })
    );
  } else {
    return JSON.parse(
      JSON.stringify({
        success: false,
        status: 400,
        message: "Wrong Password",
      })
    );
  }
};

export const SignUpWithEmailAndPassword = async (payload) => {
  // TODO Implement Two factor auth before storing the user In our database
  const email = payload.get("email");
  const password = payload.get("password");
  console.log(email, password);

  const conn = await dbConnect();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return JSON.parse(
      JSON.stringify({
        message: "User Already Exists",
        status: 400,
      })
    );
  }

  // Hash the password before storing it in the database
  // const hashedPassword = await bcrypt.hash(password, 10);
  // console.log("Data ", email, "   ", password, "   ", hashedPassword);

  // If user is created successfully, return a success message
  const users = await User.create({ email, password });

  const data = JSON.stringify(users);
  console.log("users ", users);
  return JSON.parse(
    JSON.stringify({
      status: 200,
      success: true,
      data: data,
    })
  );
};
