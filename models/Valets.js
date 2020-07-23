const mongoose = require("mongoose");

const valetSchema = new mongoose.Schema({
  carNumber: String,
  ownerName: String,
  timeIn: Date,
  driverName: String,
  timeOut: Date,
  staffId: String,
  ownerId: String,
  businessId: String,
});

module.exports = mongoose.model("Valet", valetSchema);
