const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobno: { type: String, required: true },
  email: String,
  address: String,
  specialEvent: String,
  gender: String,
  modeOfBooking: String,
  visitingAs: String,
  staffId: String,
  dateOfBirth: String,
  businessId: String,
  ownerId: String,
  seats: { type: String, required: true },
  createdAt: Date,
  checkIn: String,
  checkOut: String,
});

module.exports = mongoose.model("Reservation", reservationSchema);
