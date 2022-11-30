const mongoose = require("mongoose");

const model = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    starttime: {
      type: String, 
      required: true,
    },
    endtime: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Event", model);
