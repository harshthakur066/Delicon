const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
// const requireStaff = require('../middlewares/requireStaff');

// For Staff to POST new Reservations 
router.post('/api/v1/:staffId/reservations', async (req,res) => {        
  const { name, email, mobno, address } = req.body;
  const staffId = req.params.staffId;
  var dateobj = new Date().toISOString(); 
  try {
    const reservation = new Reservation({ name: name, email: email, staffId: staffId, mobno: mobno, address: address, createdAt: dateobj });
    await reservation.save();
    res.json(reservation);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

//For Staff to Show his reservations
router.get('/api/v1/:staffId/reservations', async (req,res) => {
  const staffId = req.params.staffId;
  try {
    const reservations = await Reservation.find({ staffId: staffId });
    res.json(reservations);
  } catch (err) {
    console.log(err);
    res.json({ error: err.message });
  }
});

//For Staff to SHOW a perticular Reservation
router.get('/api/v1/:staffId/reservations/:reservationId', async (req,res) => {
  try {
    const { reservationId } = req.params;
    const reservation = await Reservation.findById(reservationId);
    res.json(reservation);
  } catch (err) {
    console.log(err);
    res.json({ error: err.message });
  }
});

//For Staff to EDIT a perticular Reservation
router.put('/api/v1/:staffId/reservations/:reservationId', async (req,res) => {        
  const { name, email, address, mobno } = req.body;
  const { reservationId } = req.params;
  try {
    const update = { name: name, email: email, address: address, mobno: mobno };
    const reservation = await Reservation.findByIdAndUpdate(reservationId, update);
    res.json(reservation);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

//For businessOwner and Admin to DELETE a perticular Reservation
router.delete('/api/v1/:staffId/reservations/:reservationId', async (req,res) => {
  const { reservationId } = req.params;
  try {
    const reservation = await Reservation.findByIdAndDelete(reservationId);
    res.json(reservation);
  } catch {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;