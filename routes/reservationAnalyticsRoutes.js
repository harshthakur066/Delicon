const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");
const requireBusinessOwner = require("../middlewares/requiredBusinessOwner");

//For Business Owner to Show all reservations
router.get(
  "/api/v1/analytics/owner",
  requireBusinessOwner,
  async (req, res) => {
    try {
      const reservations = await Reservation.find({ ownerId: req.owner._id });
      res.json(reservations);
    } catch (err) {
      console.log(err);
      res.json({ error: err.message });
    }
  }
);

////For Business Owner to Show reservations of a business
router.get(
  "/api/v1/analytics/business/:id",
  requireBusinessOwner,
  async (req, res) => {
    try {
      const reservations = await Reservation.find({
        businessId: req.params.id,
      });
      res.json(reservations);
    } catch (err) {
      console.log(err);
      res.json({ error: err.message });
    }
  }
);

////For Business Owner to Show reservations of a Staff
router.get(
  "/api/v1/analytics/staff/:id",
  requireBusinessOwner,
  async (req, res) => {
    try {
      const reservations = await Reservation.find({
        staffId: req.params.id,
      });
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

//For Business Owner to get reservations on perticular date
router.get(
  "/api/v1/analytics/date/:datestring",
  requireBusinessOwner,
  async (req, res) => {
    try {
      const reservations = await Reservation.find({
        createdAt: new Date(req.params.datestring),
      });
      res.json(reservations);
    } catch (err) {
      console.log(err);
      res.json({ error: err.message });
    }
  }
);

//For Business Owner to get reservations between date range
router.get(
  "/api/v1/analytics/daterange/:datefrom/:dateto",
  requireBusinessOwner,
  async (req, res) => {
    try {
      const reservations = await Reservation.find({
        createdAt: { $gte: req.params.datefrom, $lte: req.params.dateto },
      }).sort({ createdAt: 1 });
      res.json(reservations);
    } catch (err) {
      console.log(err);
      res.json({ error: err.message });
    }
  }
);

module.exports = router;
