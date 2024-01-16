const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ContactSchema = new Schema(
  {
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ContactModel = model("Contact", ContactSchema);

module.exports = ContactModel;
