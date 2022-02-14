import { Schema, model } from "mongoose";

const ContactSchema = new Schema({
  firstname: {
    required: true,
    type: String,
  },
  lastname: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  phone: {
    required: true,
    type: Number
  }
}, { timestamps: true });

let ContactModel = model("contact", ContactSchema);

export default ContactModel;