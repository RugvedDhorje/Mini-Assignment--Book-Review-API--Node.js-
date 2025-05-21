const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const auth = require("../middleware/auth");
const zod = require("zod");

//* Zod validation for Book Data
const bookSchema = zod.object({
  name: zod.string(),
  author: zod.string(),
  genre: zod.string(),
  rating: zod.number(),
});

//* Api to register a new book
router.post("/create", auth, async (req, res) => {
  const body = req.body;

  const result = bookSchema.safeParse(body);
  if (!result) {
    res.json({
      message: "Enter the valid Data",
    });
  }
  const bookPresent = await Book.findOne({ name: body.name });
  if (bookPresent) {
    res.json({
      message: "book already registered",
    });
  }
  const newBook = new Book(body);
  await newBook.save();

  res.status(201).json(newBook);
});

//* Get books With pagination & filters
router.get("/allBooks", async (req, res) => {
  const { page = 1, limit = 10, author, genre } = req.query;
  const filter = {};
  if (author) filter.author = new RegExp(author, "i");
  if (genre) filter.genre = new RegExp(genre, "i");

  const books = await Book.find(filter)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));
  res.json(books);
});

//* Book details + reviews + average rating
router.get("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id).populate({
    path: "reviews",
    populate: { path: "user", select: "username" },
  });

  const ratings = book.reviews.map((r) => r.rating);
  const avgRating = ratings.length
    ? ratings.reduce((a, b) => a + b) / ratings.length
    : 0;

  res.json({ book, avgRating });
});

module.exports = router;
