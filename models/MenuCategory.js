const mongoose = require("mongoose");

const { Schema } = mongoose;

const menuCategorySchema = new Schema({
  name: String,
  details: String,
  ownerId: String,
  businessId: String,
  createdAt: Date,
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
    },
  ],
});

module.exports = mongoose.model("MenuCategory", menuCategorySchema);
