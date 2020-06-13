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
    const date = req.params.datestring.split("-");
    try {
      const reservations = await Reservation.find({
        createdAt: new Date(date[0], date[1], date[2]),
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
    const fromdate = req.params.datefrom.split("-");
    const todate = req.params.dateto.split("-");
    try {
      const reservations = await Reservation.find({
        createdAt: {
          $gte: new Date(fromdate[0], fromdate[1], fromdate[2]),
          $lte: new Date(todate[0], todate[1], todate[2]),
        },
      }).sort({ createdAt: 1 });
      res.json(reservations);
    } catch (err) {
      console.log(err);
      res.json({ error: err.message });
    }
  }
);

module.exports = router;
