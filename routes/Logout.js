const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  res.json({ message: "Logged out" });
});
module.exports = router;
