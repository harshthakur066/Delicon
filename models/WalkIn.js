const mongoose = require("mongoose");

const walkInSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Phone: { type: String, required: true },
  Email: String,
  DOB: String,
  Address: String,
  TimeIn: String,
  TimeOut: String,
  staffId: String,
  ownerId: String,
  businessId: String,
});

module.exports = mongoose.model("WalkIn", walkInSchema);
