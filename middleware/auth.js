const jwt = require("jsonwebtoken");
const User = require("../models/user");

// const TokenVerify = function (req, res, next) {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Access Denied" });

//   try {
//     const verified = jwt.verify(token, "Secret@25");
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(400).json({ message: "Invalid Token" });
//   }
// };
const TokenVerify = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token)
      return res.status(401).json({ message: "Access denied. No token." });

    const decoded = jwt.verify(token, "Secret@25");
    const user = await User.findById(decoded.userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user; // this is key
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};
module.exports = TokenVerify;
