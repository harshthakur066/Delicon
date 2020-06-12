const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
  name: String,
  owner: String,
  ownerId: String,
  address: String,
  details: String,
  createdAt: Date,
  staff: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
    },
  ],
});

module.exports = mongoose.model("Business", businessSchema);
