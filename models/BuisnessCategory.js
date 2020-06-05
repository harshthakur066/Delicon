const mongoose = require("mongoose");

const { Schema } = mongoose;

const buisnessCategorySchema = new Schema({
  name: String,
  details: String,
});

mongoose.model("BuisnessCategory", buisnessCategorySchema);
