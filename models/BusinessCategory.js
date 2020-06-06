const mongoose = require("mongoose");

const { Schema } = mongoose;

const buisnessCategorySchema = new Schema({
  name: String,
  details: String,
  adminId: String,
  createdAt: String
});

module.exports = mongoose.model("BuisnessCategory", buisnessCategorySchema);
