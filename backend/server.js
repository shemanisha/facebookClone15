const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.send("hello from home");
});
app.listen(8000, () => {
  console.log("App is listening on port 8000");
});
