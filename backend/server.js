const express = require("express");
const cors = require("cors");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(cors());

readdirSync("./routes").map((route) => {
  app.use("/", require("./routes/" + route));
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("App is listening on port 8000");
});
