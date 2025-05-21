const express = require("express");
const userRouter = require("../routes/user");
const BookRouter = require("../routes/books");
const ReviewRouter = require("../routes/reviews");
const SearchRouter = require("../routes/search");
const router = express.Router();

router.use("/user", userRouter);
router.use("/book", BookRouter);
router.use("/review", ReviewRouter);
router.use("/search", SearchRouter);

module.exports = router;
