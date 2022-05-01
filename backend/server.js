const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(cors());

//routes
readdirSync("./routes").map((route) => {
  app.use("/", require("./routes/" + route));
});

//database
mongoose
  .connect(process.env.DATABASE_URL, {})
  .then(() => {
    console.log("Connection is successful");
  })
  .catch((err) => console.log("error connecting to database", err.message));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("App is listening on port 8000");
});
