const { default: mongoose } = require("mongoose");
const moongoose = require("../connection");

const mySchema = new moongoose.Schema({
  shippingAdress: String,
  shippingStatus: String,
  user: { type: mongoose.Types.ObjectId, ref: "users" },
  novel: { type: mongoose.Types.ObjectId, ref: "novels" },
  createdAt: Date,
});

const checkoutModel = moongoose.model("checkout", mySchema);

module.exports = { checkoutModel };
