const mongoose = require("mongoose");

const { Schema } = mongoose;

const serviceCategorySchema = new Schema({
  name: String,
  details: String,
  ownerId: String,
  businessId: String,
  createdAt: Date,
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceItem",
    },
  ],
});

module.exports = mongoose.model("ServiceCategory", serviceCategorySchema);
