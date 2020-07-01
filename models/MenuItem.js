const mongoose = require("mongoose");

const { Schema } = mongoose;

const dishSchema = new Schema({
  name: String,
  details: String,
  categoryId: String,
  ownerId: String,
  createdAt: Date,
});

module.exports = mongoose.model("MenuItem", dishSchema);
