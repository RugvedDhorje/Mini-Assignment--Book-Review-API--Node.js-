const express = require("express");
const router = express.Router();
const Review = require("../models/review");
const Book = require("../models/book");
const auth = require("../middleware/auth");

// POST /books/:id/reviews – Submit review (1 per user per book)
router.post("/books/:id/reviews", auth, async (req, res) => {
  const existing = await Review.findOne({
    user: req.user._id,
    book: req.params.id,
  });
  if (existing) return res.status(400).json({ message: "Already reviewed" });

  const review = new Review({
    book: req.params.id,
    user: req.user._id,
    rating: req.body.rating,
    comment: req.body.comment,
  });
  await review.save();

  await Book.findByIdAndUpdate(req.params.id, {
    $push: { reviews: review._id },
  });
  res.status(201).json(review);
});

// PUT /reviews/:id – Update your review
router.put("/update/:id", auth, async (req, res) => {
  const review = await Review.findById(req.params.id);
  console.log(review.user._id);
  if (!review || review.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  review.rating = req.body.rating;
  review.comment = req.body.comment;
  await review.save();
  res.json(review);
});

// DELETE /reviews/:id – Delete your review
router.delete("/delete/:id", auth, async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }

  if (!review.user || review.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  await review.deleteOne();

  res.json({ message: "Review deleted" });
});

module.exports = router;
