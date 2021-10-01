var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = mongoose.model("User");
var CommerceType = mongoose.model("CommerceType");

var CommerceSchema = new Schema({
  userId: { type: Schema.ObjectId, ref: "User", required: true },
  typeCommerceId: {
    type: Schema.ObjectId,
    ref: "CommerceType",
    required: true,
  },
  name: { type: String, required: true },
  phone: { type: Number },
  direction: { type: String },
  cuit: { type: String },
  razonSocial: { type: String },
});

module.exports = mongoose.model("Commerce", CommerceSchema);
