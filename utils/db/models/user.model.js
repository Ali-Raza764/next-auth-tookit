import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  authType: {
    type: String, // Credentials or O Auth
    required: true,
  },
  authProvider: {
    type: String,
  },
  avatar: {
    type: String,
  },
});

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
