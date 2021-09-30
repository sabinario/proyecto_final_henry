var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Client = mongoose.model("Client");
var User = mongoose.model("User");
var Product = mongoose.model("Product");

var orders = new Schema({
  date: { type: Date, required: true },
  products: [{ type: Schema.ObjectId, ref: "Product", required: true }], // ver tema precios
  clientId: { type: Schema.ObjectId, ref: "Client", required: true }, // no asociar
  userId: { type: Schema.ObjectId, ref: "User", required: true }, // no asociar
  typeOrder: {
    type: String,
    enum: ["Take Away", "Delivery", "In Place"],
    required: true,
  },
});

module.exports = mongoose.model("Order", orders);
