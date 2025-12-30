const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../model/User");

router.get("/", async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not logged in" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find user by email
    const user = await User.findOne({ email: decoded.email }).select(
      "-password"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Logged in", user });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;
