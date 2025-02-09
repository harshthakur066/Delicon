const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");
const Staff = require("../models/Staff");
const requireStaff = require("../middlewares/requireStaff");

// For Staff to POST new Reservations
router.post("/api/v1/reservations", requireStaff, async (req, res) => {
  const {
    name,
    mobno,
    email,
    address,
    dateOfBirth,
    specialEvent,
    gender,
    modeOfBooking,
    visitingAs,
    seats,
    ownerId,
    businessId,
    createdAt,
  } = req.body;
  const staffId = req.staff._id;
  try {
    const reservation = new Reservation({
      name: name,
      email: email,
      staffId: staffId,
      mobno: mobno,
      address: address,
      specialEvent: specialEvent,
      gender: gender,
      modeOfBooking: modeOfBooking,
      visitingAs: visitingAs,
      createdAt,
      dateOfBirth: dateOfBirth,
      seats: seats,
      ownerId,
      businessId,
    });
    await reservation.save();
    try {
      const currentstaff = await Staff.findById(staffId);
      currentstaff.reservations.push(reservation._id);
      await Staff.findByIdAndUpdate(staffId, currentstaff);
      res.json(reservation);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: err.message,
        message: "Error while adding id to Staff!",
      });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

//For Staff to Show his reservations
router.get("/api/v1/reservations", requireStaff, async (req, res) => {
  const staffId = req.staff._id;
  try {
    const reservations = await Reservation.find({ staffId: staffId });
    res.json(reservations);
  } catch (err) {
    console.log(err);
    res.json({ error: err.message });
  }
});

//For Staff to SHOW a perticular Reservation
router.get(
  "/api/v1/reservations/:reservationId",
  requireStaff,
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

//For Staff to EDIT a perticular Reservation
router.put(
  "/api/v1/reservations/:reservationId",
  requireStaff,
  async (req, res) => {
    const {
      name,
      email,
      address,
      mobno,
      dateOfBirth,
      seats,
      specialEvent,
      modeOfBooking,
      gender,
      visitingAs,
    } = req.body;
    const { reservationId } = req.params;
    try {
      const update = {
        name: name,
        email: email,
        address: address,
        mobno: mobno,
        specialEvent: specialEvent,
        gender: gender,
        modeOfBooking: modeOfBooking,
        visitingAs: visitingAs,
        dateOfBirth: dateOfBirth,
        seats: seats,
      };
      const reservation = await Reservation.findByIdAndUpdate(
        reservationId,
        update
      );
      res.json(reservation);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

// For Staff to DELETE a perticular Reservation
router.delete(
  "/api/v1/reservations/:reservationId",
  requireStaff,
  async (req, res) => {
    const { reservationId } = req.params;
    try {
      const reservation = await Reservation.findByIdAndDelete(reservationId);
      try {
        const currentstaff = await Staff.findById(req.staff._id);
        currentstaff.reservations = currentstaff.reservations.filter(
          (id) => id != reservationId
        );
        await Staff.findByIdAndUpdate(req.staff._id, currentstaff);
        res.json(reservation);
      } catch (err) {
        console.log(err);
        res.status(500).json({
          error: err.message,
          message: "Error while adding id to Business Owner!",
        });
      }
    } catch {
      return res.status(500).json({ error: err.message });
    }
  }
);

// To update checkin accsess to staff
router.put(
  "/api/v1/reservations/:reservationId/checkin",
  requireStaff,
  async (req, res) => {
    const { reservationId } = req.params;
    const checkIn = new Date().toISOString();
    try {
      const update = {
        checkIn,
      };
      const reservation = await Reservation.findByIdAndUpdate(
        reservationId,
        update,
        { new: true }
      );
      res.json(reservation);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

// To update checkout access to staff
router.put(
  "/api/v1/reservations/:reservationId/checkout",
  requireStaff,
  async (req, res) => {
    const { reservationId } = req.params;
    const checkOut = new Date().toISOString();
    try {
      const update = {
        checkOut,
      };
      const reservation = await Reservation.findByIdAndUpdate(
        reservationId,
        update,
        { new: true }
      );
      res.json(reservation);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
