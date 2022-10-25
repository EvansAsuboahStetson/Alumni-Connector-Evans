const mongoose = require("mongoose");
const { roles } = require("../enums/roles.enum");

const model = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [roles.ADMIN, roles.USER],
      default: roles.USER,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      zip: { type: String, required: true },
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("User", model);
