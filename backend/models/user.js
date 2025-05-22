import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    // 👇 Add these two fields for password reset
    resetToken: {
      type: String,
    },
    resetTokenExpire: {
      type: Date,
    },
    /*  role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    }, */
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
