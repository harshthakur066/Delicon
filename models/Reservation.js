const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobno: String,
  address: String,
  staffId: String,
  createdAt: String
});

module.exports = mongoose.model('Reservation', reservationSchema);