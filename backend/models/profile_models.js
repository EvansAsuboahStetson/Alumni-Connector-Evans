const mongoose = require("mongoose");

const model = mongoose.Schema(
  {
    major: {
      type: String,
      required: true,
    },
    minor: {
        type: String,
        required: false,
        default: null
      },
    GradYear: {
      type: Number,
      required: true,
    },
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Profile", model);
