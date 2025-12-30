const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../model/User");
// const cookieParser = require("cookie-parser");

router.post("/", async (req, res) => {
  try {
    let { name, email, password } = req.body;
    // 1. Check if user already exists BEFORE hashing (saves CPU time)
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already exists");
    }

    // 2. Generate Salt and Hash
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) return res.status(500).json({ message: "Hash error" });

        // 3. Create the user
        const createdUser = await userModel.create({
          name,
          email,
          password: hash,
        });

        // 4. Generate Token
        let token = jwt.sign({ email }, process.env.JWT_SECRET);

        // 5. Set Cookie
        res.cookie("token", token, {
          httpOnly: true,
          sameSite: "lax",
          secure: false, // Set to true if using HTTPS
        });

        // 6. Final Response
        return res.status(201).send(createdUser);
      });
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
