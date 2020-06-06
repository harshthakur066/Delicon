const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  name: String,
  owner: String,
  ownerId: String,
  catagory: String,
  catagoryId: String,
  details: String,
  createdAt: String,
  staff: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
    },
  ],
});

module.exports = mongoose.model("Business", businessSchema);
