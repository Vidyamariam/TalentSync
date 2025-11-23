import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: "",
    },
    clarkId: {
      type: String,
      default: "",
      required: true,
      unique: true,
    },
  },
  {
    timeStamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
