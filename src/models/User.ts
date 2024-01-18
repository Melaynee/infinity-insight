import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  email: string;
  username: string;
  passwordHash: string;
  avatarUrl: string;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    avatarUrl: String,
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<IUser>("User", UserSchema);

export { IUser };
export default UserModel;
