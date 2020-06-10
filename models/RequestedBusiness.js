const mongoose = require("mongoose");

const requestedBusinessSchema = new mongoose.Schema({
  name: String,
  owner: String,
  status: String,
  ownerId: String,
  address: String,
  details: String,
  createdAt: String,
});

module.exports = mongoose.model("RequestedBusiness", requestedBusinessSchema);
