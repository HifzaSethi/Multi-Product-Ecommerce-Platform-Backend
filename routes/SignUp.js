const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../model/User");
const cookieParser = require("cookie-parser");
router.post("/", (req, res) => {
  let { name, email, password } = req.body;
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      const createdUser = await userModel.create({
        name,
        email,
        password: hash,
      });
      let token = jwt.sign({ email }, process.env.JWT_SECRET);

      res.cookie("Token", token);
      res.send(createdUser);
    });
  });
});

module.exports = router;
