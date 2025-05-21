const jwt = require("jsonwebtoken");
const User = require("../models/user");
const JWT_SECRET = process.env.JWT_SECRET || "Secret@25"; // Use env in production

const TokenVerify = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token)
      return res.status(401).json({ message: "Access denied. No token." });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user; // this is key
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};
module.exports = TokenVerify;
