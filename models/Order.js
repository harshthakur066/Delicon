const mongoose = require("mongoose");

const { Schema } = mongoose;

const OrderSchema = new Schema({
  custId: String,
  staffId: String,
  MenuItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
    },
  ],
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
  businessId: String,
  createdAt: Date,
  delivered: Boolean,
});

module.exports = mongoose.model("Order", OrderSchema);
