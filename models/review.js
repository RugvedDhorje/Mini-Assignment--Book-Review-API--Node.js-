const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number, min: 1, max: 5 },
    comment: {
      type: String,
      required: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
