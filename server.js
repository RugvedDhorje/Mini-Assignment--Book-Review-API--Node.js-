const express = require("express");
const mainRouter = require("./routes/index");
const app = express();
const cors = require("cors");
const connectDB = require("./connectDB");
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api", mainRouter);

connectDB()
  .then(() => {
    console.log("Database Connected Successfully.....");
    app.listen(PORT, () => {
      console.log("server connected Successfully");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected!");
  });

module.exports = app;
