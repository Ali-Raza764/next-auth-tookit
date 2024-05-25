"use server";
import dbConnect from "@/utils/db/dbConnect";
import User from "@/utils/db/models/user.model";

export const SignInWithEmailAndPassword = async (payload) => {
  const email = payload.email;
  const password = payload.password;

  const conn = await dbConnect();

  //* Find the user in the database
  const user = await User.findOne({ email });

  //* If user is not found, return an error
  if (!user) {
    return null;
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
    return null;
  }
};

export const SignUpWithEmailAndPassword = async (
  payload,
  authType,
  authProvider
) => {
  // TODO Implement Two factor auth before storing the user In our database
  // TODO Implement hashing for the routes
  try {
    const email = payload.email;
    const name = payload.name;

    let userData;
    if (authType == "oauth") {
      const avatar = payload.image;
      userData = {
        email,
        name,
        authType,
        authProvider,
        avatar,
      };
    }
    if (authType == "credentials") {
      const password = payload.password;
      userData = {
        email,
        name,
        password,
        authType,
        authProvider,
      };
    }

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
    const users = await User.create(userData);

    const data = JSON.stringify(users);

    return JSON.parse(
      JSON.stringify({
        status: 200,
        success: true,
        data: data,
      })
    );
  } catch (error) {
    console.error;
  }
};
