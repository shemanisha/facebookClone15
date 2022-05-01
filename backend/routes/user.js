const express = require("express");
const { home } = require("../controllers/user");
const router = express.Router();
router.get("/users", home);

module.exports = router;
