const express = require("express");
const router = express.Router();
const Book = require("../models/book");

//* Search books by title or author
router.get("/", async (req, res) => {
  const { q } = req.query;
  const books = await Book.find({
    $or: [{ title: new RegExp(q, "i") }, { author: new RegExp(q, "i") }],
  });
  res.json(books);
});

module.exports = router;
