import mongoose from "mongoose";

interface IUser {
  username: string;
  email: string;
  avatar?: string;
}

export interface IUserDocument extends IUser, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const User =
  mongoose.models?.User || mongoose.model<IUserDocument>("User", userSchema);

export default User;
