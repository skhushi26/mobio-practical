const mongoose = require("mongoose");
const Book = require("./Book");

const ReviewSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    bookId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: Book,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("review", ReviewSchema);
