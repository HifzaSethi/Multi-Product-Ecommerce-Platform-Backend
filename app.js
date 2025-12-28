const express = require("express");

const app = express();

const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173", // allow your frontend
    credentials: true, // if you are sending cookies
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const signUpRoute = require("./routes/SignUp");
const signInRoute = require("./routes/SignIn");
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to my API!");
});

app.use("/api/auth/signup", signUpRoute);
app.use("/api/auth/signin", signInRoute);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
