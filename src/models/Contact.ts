import mongoose, { Document, Schema } from "mongoose";

export interface IContact extends Document {
  email: string;
  subject: string;
  message: string;
}

const ContactSchema = new Schema<IContact>(
  {
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ContactModel = mongoose.model<IContact>("Contact", ContactSchema);

export default ContactModel;
