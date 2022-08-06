const mongoose = require("../connection");

const mySchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  email: String,
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() }, //createdAt:Date//user defined
});

const userModel = mongoose.model("users", mySchema);
module.exports = { userModel };
