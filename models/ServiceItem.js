const mongoose = require("mongoose");

const { Schema } = mongoose;

const serviceItemSchema = new Schema({
  name: String,
  details: String,
  price: String,
  categoryId: String,
  ownerId: String,
  createdAt: Date,
});

module.exports = mongoose.model("ServiceItem", serviceItemSchema);
