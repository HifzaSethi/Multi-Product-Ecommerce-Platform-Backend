const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);
const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});
module.exports = mongoose.model("User", UserSchema);
