const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});
const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
