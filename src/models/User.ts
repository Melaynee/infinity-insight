import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  email: string;
  username: string;
  password: string;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 8 },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<IUser>("User", UserSchema);

export { IUser };
export default UserModel;
