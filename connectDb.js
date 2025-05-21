const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://RugvedDhorje:Rugved123@myvendex.4jiw7.mongodb.net/Books"
  );
};
module.exports = connectDB;
