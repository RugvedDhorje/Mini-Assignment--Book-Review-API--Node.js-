const mongoose = require("mongoose");
require("dotenv").config();
const MongoDB_URL = process.env.MONGO_URI;

//* Connection with MongoDB Database

const connectDB = async () => {
  await mongoose.connect(MongoDB_URL);
};
module.exports = connectDB;
