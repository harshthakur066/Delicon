const mongoose = require("mongoose");

const walkInSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobno: { type: String, required: true },
  email: String,
  dob: String,
  address: String,
  specialEvent: String,
  gender: String,
  modeOfBooking: String,
  visitingAs: String,
  know: String,
  seats: { type: String, required: true },
  walkIn: String,
  walkOut: String,
  staffId: String,
  ownerId: String,
  businessId: String,
});

module.exports = mongoose.model("WalkIn", walkInSchema);
