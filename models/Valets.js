const mongoose = require("mongoose");

const valetSchema = new mongoose.Schema({
  carNumber: String,
  ownerName: String,
  timeIn: String,
  driverName: String,
  timeOut: String,
  staffId: String,
  ownerId: String,
  businessId: String,
});

module.exports = mongoose.model("Valet", valetSchema);
