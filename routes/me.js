const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth"); // import middleware

router.get("/", isAuth, (req, res) => {
  // At this point, req.user is set by isAuth
  res.json({ user: req.user });
});

module.exports = router;
