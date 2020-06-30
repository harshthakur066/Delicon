const mongoose = require("mongoose");

const { Schema } = mongoose;

const menuCategorySchema = new Schema({
  name: String,
  details: String,
  ownerId: String,
  createdAt: Date,
  dishes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dish",
    },
  ],
});

module.exports = mongoose.model("MenuCategory", menuCategorySchema);
