const express = require("express");
const router = express.Router();
const WalkIn = require("../models/WalkIn");
const Staff = require("../models/Staff");
const requireStaff = require("../middlewares/requireStaff");
const requireOwner = require("../middlewares/requiredBusinessOwner");

// To post the walkin
router.post("/api/v1/walkin", requireStaff, async (req, res) => {
  const TimeIn = new Date().toISOString();
  const { Name, Phone, Email, DOB, Address, businessId } = req.body;
  const staffId = req.staff._id;
  try {
    const walkIn = new WalkIn({
      Name,
      Phone,
      Email,
      DOB,
      Address,
      businessId,
      TimeIn,
      staffId,
    });
    await walkIn.save();
    try {
      const currentstaff = await Staff.findById(staffId);
      currentstaff.WalkIn.push(WalkIn._id);
      await Staff.findByIdAndUpdate(staffId, currentstaff);
      res.json(WalkIn);
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
router.put("/api/v1/walkin/timeout/:id", requireStaff, async (req, res) => {
  const walkInId = req.params.id;
  const TimeOut = new Date().toISOString();
  try {
    const update = {
      TimeOut: TimeOut,
    };
    const walkIn = await WalkIn.findByIdAndUpdate(walkInId, update);
    res.send(walkIn);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// To update particular walkin
router.put("/api/v1/walkin/:id", requireStaff, async (req, res) => {
  const { Name, Phone, Email, DOB, Address } = req.body;
  const walkInId = req.params.id;
  try {
    const update = {
      Name: Name,
      Phone: Phone,
      Email: Email,
      DOB: DOB,
      Address: Address,
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
    res.send(walkIn);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
