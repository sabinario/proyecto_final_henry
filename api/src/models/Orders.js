const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    date: { type: Date, default: new Date() },
    orderNumber: { type: Number, required: true },
    tableNumber: { type: Number },
    products: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        amount: { type: Number, required: true },
        observations: { type: String },
      },
    ],
    clientId: { type: Schema.ObjectId, ref: "Client" }, //required: true
    userId: { type: Schema.ObjectId, ref: "User" }, //required: true
    type: {
      type: String,
      enum: ["Take Away", "Delivery", "Salon"],
      required: true,
    },
    estado: {
      type: String,
      enum: ["Pendiente", "En progreso", "Finalizada"],
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

OrderSchema.virtual("totalPrice").get(function () {
  return this.products.reduce(function (prev, actual) {
    return prev + actual.price * actual.amount;
  }, 0);
});

module.exports = mongoose.model("Order", OrderSchema);
