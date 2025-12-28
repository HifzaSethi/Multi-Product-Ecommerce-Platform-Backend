const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.json({ message: "signin working" });
});

module.exports = router;
