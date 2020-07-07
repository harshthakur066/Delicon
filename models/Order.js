const mongoose = require("mongoose");

const { Schema } = mongoose;

const OrderSchema = new Schema({
  custId: String,
  custName: String,
  staffId: String,
  staffName: String,
  itemCount: Number,
  MenuItems: { type: Array, default: [] },
  services: { type: Array, default: [] },
  businessId: String,
  createdAt: Date,
  delivered: Boolean,
});

module.exports = mongoose.model("Order", OrderSchema);
