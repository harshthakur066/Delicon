const express = require("express");
const router = express.Router();
const WalkIn = require("../models/WalkIn");
const Staff = require("../models/Staff");
const requireStaff = require("../middlewares/requireStaff");
const requireOwner = require("../middlewares/requiredBusinessOwner");

// To post the walkin
router.post("/api/v1/walkin", requireStaff, async (req, res) => {
  const walkIn = new Date().toISOString();
  const {
    name,
    mobno,
    email,
    dob,
    address,
    businessId,
    ownerId,
    seats,
    specialEvent,
    modeOfBooking,
    gender,
    visitingAs,
    known,
  } = req.body;
  const staffId = req.staff._id;
  try {
    const walk = new WalkIn({
      name,
      mobno,
      email,
      dob,
      address,
      businessId,
      ownerId,
      staffId,
      walkIn,
      seats,
      specialEvent,
      modeOfBooking,
      gender,
      visitingAs,
      known,
    });
    await walk.save();
    try {
      const currentstaff = await Staff.findById(staffId);
      currentstaff.walkIns.push(walk._id);
      await Staff.findByIdAndUpdate(staffId, currentstaff);
      res.json(walk);
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

// For business Owner to get all walkins
router.get("/api/v1/owner/walkin", requireOwner, async (req, res) => {
  const ownerId = req.owner._id;
  try {
    const walkIn = await WalkIn.find({ ownerId: ownerId });
    res.send(walkIn);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// For Staff to get all walkins
router.get("/api/v1/walkin", requireStaff, async (req, res) => {
  const staffId = req.staff._id;
  try {
    const walkIn = await WalkIn.find({ staffId: staffId });
    res.send(walkIn);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// For Staff to get particular walkin
router.get("/api/v1/walkin/:id", requireStaff, async (req, res) => {
  const walkInId = req.params.id;
  try {
    const walkIn = await WalkIn.findById(walkInId);
    res.send(walkIn);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// For timeOut
router.put("/api/v1/walkin/:id/walkout", requireStaff, async (req, res) => {
  const walkInId = req.params.id;
  const walkOut = new Date().toISOString();
  try {
    const update = {
      walkOut: walkOut,
    };
    const walkIn = await WalkIn.findByIdAndUpdate(walkInId, update, {
      new: true,
    });
    res.send(walkIn);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// To update particular walkin
router.put("/api/v1/walkin/:id", requireStaff, async (req, res) => {
  const {
    name,
    mobno,
    email,
    dob,
    address,
    seats,
    specialEvent,
    modeOfBooking,
    gender,
    visitingAs,
    known,
  } = req.body;
  const walkInId = req.params.id;
  try {
    const update = {
      name,
      mobno,
      email,
      dob,
      address,
      seats,
      specialEvent,
      modeOfBooking,
      gender,
      visitingAs,
      known,
    };
    const walkIn = await WalkIn.findByIdAndUpdate(walkInId, update);
    res.send(walkIn);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// To delete particular walkin
router.delete("/api/v1/walkin/:id", requireStaff, async (req, res) => {
  const walkInId = req.params.id;
  try {
    const walkIn = await WalkIn.findByIdAndDelete(walkInId);
    try {
      const currentstaff = await Staff.findById(req.staff._id);
      currentstaff.walkIns = currentstaff.walkIns.filter(
        (id) => id != walkInId
      );
      await Staff.findByIdAndUpdate(req.staff._id, currentstaff);
      res.send(walkIn);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: err.message,
        message: "Error while adding id to Business Owner!",
      });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
