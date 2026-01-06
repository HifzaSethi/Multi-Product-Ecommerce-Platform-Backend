require("dotenv").config();
const express = require("express");
const meRoute = require("./routes/me");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const signUpRoute = require("./routes/SignUp");
const signInRoute = require("./routes/SignIn");
const logoutRoute = require("./routes/Logout");
const AdminProducts = require("./routes/AdminProduct");
const uploadTest = require("./routes/uploadTest");
const mongoose = require("mongoose");
const app = express();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo error:", err));
app.use((req, res, next) => {
  res.header(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.header("Pragma", "no-cache");
  res.header("Expires", "0");
  next();
});
app.use(
  cors({
    origin: "http://localhost:5173", // allow your frontend
    credentials: true, // if you are sending cookies
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/upload", uploadTest);
app.get("/", (req, res) => {
  res.send("Welcome to my API!");
});
app.use("/api/admin/adminProduct", AdminProducts);
app.use("/api/auth/signup", signUpRoute);
app.use("/api/auth/signin", signInRoute);
app.use("/api/auth/me", meRoute);
app.use("/api/auth/logout", logoutRoute);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
