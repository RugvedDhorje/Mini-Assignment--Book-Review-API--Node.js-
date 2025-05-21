const express = require("express");
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const JWT_SECRET = process.env.JWT_SECRET || "Secret@25"; // Use env in production

const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(8),
  firstName: zod.string().min(3).max(20),
  lastName: zod.string().min(3).max(20),
});
router.post("/signup", async (req, res) => {
  try {
    const body = req.body;
    // zod validation
    const result = signupSchema.parse(body);
    if (!result) {
      return res.json({
        message: "Email already taken / incorrect input",
      });
    }
    // Checking if the user already exit
    const user = await User.findOne({ username: body.username });
    if (user) {
      return res.json({
        message: "Email already taken / incorrect input",
      });
    }
    // Hash password before storing it in the Database
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const dbUser = await User.create({
      ...body,
      password: hashedPassword,
    });
    // Generate the JWT Token that will expire in 7 days
    const token = jwt.sign(
      {
        userId: dbUser._id,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({
      message: "user crated successfully",
      token,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
//! SignIn Route
const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string().min(8),
});
router.post("/signin", async (req, res) => {
  try {
    const body = req.body;

    // Zod Validation
    const result = signinSchema.safeParse(body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // Find user if Present
    const user = await User.findOne({ username: body.username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare passwords with the hashed password
    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT Token which will expire in 7 days
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Compare password
// const isPasswordValid = await user.comparePassword(body.password);
// if (!isPasswordValid) {
//   return res.status(401).json({ message: "Invalid username or password" });
// }

// router.get("/bulk", async (req, res) => {
//   const filter = req.query.filter || "";

//   const user = await User.find({
//     $or: [
//       {
//         firstName: {
//           $regex: filter,
//         },
//       },
//       {
//         lastName: {
//           $regex: filter,
//         },
//       },
//     ],
//   });
//   res.status(200).json({
//     user: user.map((user) => ({
//       username: user.username,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       _id: user._id,
//     })),
//   });
// });

module.exports = router;
