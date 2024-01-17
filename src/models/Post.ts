import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./User";

export interface IPost extends Document {
  title: string;
  summary: string;
  content: string;
  cover: string;
  author: IUser["_id"];
  likes: IUser["_id"][];
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    cover: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model<IPost>("Post", PostSchema);

export default PostModel;
