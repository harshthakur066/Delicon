const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");
const requireStaff = require("../middlewares/requireStaff");

// For CheckIn
router.put(
  "/api/v1/reservation/checkin/:id",
  requireStaff,
  async (req, res) => {
    const reservationId = req.params.id;
    const timeIn = new Date().toISOString();
    try {
      const update = {
        checkIn: timeIn,
      };
      const reservation = await Reservation.findByIdAndUpdate(
        reservationId,
        update,
        { new: true }
      );
      res.send(reservation);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

// For checkout
router.put(
  "/api/v1/reservation/checkout/:id",
  requireStaff,
  async (req, res) => {
    const reservationId = req.params.id;
    const timeOut = new Date().toISOString();
    try {
      const update = {
        checkOut: timeOut,
      };
      const reservation = await Reservation.findByIdAndUpdate(
        reservationId,
        update,
        { new: true }
      );
      res.send(reservation);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
