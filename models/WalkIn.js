const mongoose = require("mongoose");

const walkInSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobno: { type: String, required: true },
  email: String,
  dob: String,
  address: String,
  walkIn: String,
  walkOut: String,
  staffId: String,
  ownerId: String,
  businessId: String,
});

module.exports = mongoose.model("WalkIn", walkInSchema);
