const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
  name: String,
  owner: String,
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  catagory: String,
  catagoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Catagory",
  },
  details: String,
  staff: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
    },
  ],
});

mongoose.model("Business", businessSchema);
