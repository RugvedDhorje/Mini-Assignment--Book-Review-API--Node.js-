const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: String,
  author: String,
  genre: String,
  rating: Number,
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});
const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
