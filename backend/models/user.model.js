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
      enum: [roles.ADMIN, roles.STUDENT, roles.ALUMNI],
    },
    name: {
      type: String,
      required: true,
    },
    major: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = new mongoose.model("User", model);