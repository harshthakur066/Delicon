const mongoose = require("mongoose");

const { Schema } = mongoose;

const buisnessCategorySchema = new Schema({
  name: String,
  details: String,
  adminId: String,
  createdAt: String,
  businessowners: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BusinessOwner",
    },
  ],
});

module.exports = mongoose.model("BuisnessCategory", buisnessCategorySchema);
