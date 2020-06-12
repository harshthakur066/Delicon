const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");
const requireBusinessOwner = require("../middlewares/requiredBusinessOwner");

//For Business Owner to Show all reservations
router.get(
  "/api/v1/analytics/reservations",
  requireBusinessOwner,
  async (req, res) => {
    try {
      const reservations = await Reservation.find();
      res.json(reservations);
    } catch (err) {
      console.log(err);
      res.json({ error: err.message });
    }
  }
);

//For Business Owner to SHOW a perticular Reservation
router.get(
  "/api/v1/analytics/reservations/:reservationId",
  requireBusinessOwner,
  async (req, res) => {
    try {
      const { reservationId } = req.params;
      const reservation = await Reservation.findById(reservationId);
      res.json(reservation);
    } catch (err) {
      console.log(err);
      res.json({ error: err.message });
    }
  }
);

module.exports = router;
