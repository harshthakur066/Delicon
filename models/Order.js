const mongoose = require("mongoose");

const { Schema } = mongoose;

const OrderSchema = new Schema({
  custId: String,
  custName: String,
  mobno: String,
  email: String,
  staffId: String,
  staffName: String,
  itemCount: Number,
  MenuItems: { type: Array, default: [] },
  services: { type: Array, default: [] },
  businessId: String,
  createdAt: Date,
  delivered: { type: Boolean, default: false },
  paid: { type: Boolean, default: false },
});

module.exports = mongoose.model("Order", OrderSchema);
