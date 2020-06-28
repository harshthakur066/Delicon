const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobno: String,
  address: String,
  staffId: String,
  dateOfBirth: String,
  businessId: String,
  ownerId: String,
  seats: String,
  createdAt: Date,
  checkIn: String,
  checkOut: String,
});

module.exports = mongoose.model("Reservation", reservationSchema);
