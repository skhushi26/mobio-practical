const mongoose = require("mongoose");
const User = require("./User");

const BookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: User,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("book", BookSchema);
