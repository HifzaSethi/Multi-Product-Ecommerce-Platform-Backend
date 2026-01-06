const jwt = require("jsonwebtoken");
const User = require("../model/User");

const isAuth = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not logged in" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ email: decoded.email }).select(
      "-password"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // attach user to request object
    next(); // allow the request to continue
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = isAuth;
