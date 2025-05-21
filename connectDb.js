const mongoose = require("mongoose");
require("dotenv").config();
const MongoDB_URL = process.env.MONGO_URI;

const connectDB = async () => {
  await mongoose.connect(MongoDB_URL);
};
module.exports = connectDB;
