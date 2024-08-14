import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: [true, "User Name is required"] },

    password: { type: String },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },

    image: {
      type: String,
      default: "https://github.com/shadcn.png",
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

export const UserModel = mongoose.models.User || model("User", UserSchema);
