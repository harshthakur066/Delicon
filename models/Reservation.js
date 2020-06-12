const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobno: String,
  address: String,
  staffId: String,
  dateOfBirth: String,
  seats: { type: String, default: 1, min: 1 },
  createdAt: String,
});

module.exports = mongoose.model("Reservation", reservationSchema);
