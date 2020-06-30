const express = require("express");
const router = express.Router();
const Valet = require("../models/Valets");
const Staff = require("../models/Staff");
const requireStaff = require("../middlewares/requireStaff");
const requireOwner = require("../middlewares/requiredBusinessOwner");

// To post valet
router.post("/api/v1/valets", requireStaff, async (req, res) => {
  const date = new Date().toLocaleDateString().split("/").reverse();
  const { carNumber, ownerName, driverName, ownerId, businessId } = req.body;
  const staffId = req.staff._id;
  try {
    const valet = new Valet({
      carNumber,
      ownerName,
      driverName,
      ownerId,
      businessId,
      timeIn: new Date(date[0], date[2], date[1]),
      staffId,
    });
    await valet.save();
    try {
      const currentstaff = await Staff.findById(staffId);
      currentstaff.valets.push(valet._id);
      await Staff.findByIdAndUpdate(staffId, currentstaff);
      res.json(valet);
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

// To get all valets for Business Owner
router.get("/api/v1/owner/valets", requireOwner, async (req, res) => {
  const ownerId = req.owner._id;
  try {
    const valets = await Valet.find({ ownerId: ownerId });
    res.send(valets);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// To get all valets for Staff
router.get("/api/v1/valets", requireStaff, async (req, res) => {
  const staffId = req.staff._id;
  try {
    const valets = await Valet.find({ staffId: staffId });
    res.send(valets);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// To get particular valets for Staff
router.get("/api/v1/valets/:id", requireStaff, async (req, res) => {
  const valetId = req.params.id;
  try {
    const valet = await Valet.findById(valetId);
    res.send(valet);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// To update timeout
router.put("/api/v1/valets/:id/timeout", requireStaff, async (req, res) => {
  const valetId = req.params.id;
  const timeOut = new Date().toISOString();
  try {
    const update = {
      timeOut: timeOut,
    };
    const valet = await Valet.findByIdAndUpdate(valetId, update, { new: true });
    res.send(valet);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// To update any other info
router.put("/api/v1/valets/:id", requireStaff, async (req, res) => {
  const { carNumber, ownerName, driverName } = req.body;
  const valetId = req.params.id;
  try {
    const update = {
      carNumber: carNumber,
      ownerName: ownerName,
      driverName: driverName,
    };
    const valet = await Valet.findByIdAndUpdate(valetId, update);
    res.send(valet);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

//To delete a particular valet
router.delete("/api/v1/valets/:id", requireStaff, async (req, res) => {
  const valetId = req.params.id;
  try {
    const valet = await Valet.findByIdAndDelete(valetId);
    try {
      const currentstaff = await Staff.findById(req.staff._id);
      currentstaff.valets = currentstaff.valets.filter((id) => id != valetId);
      await Staff.findByIdAndUpdate(req.staff._id, currentstaff);
      res.send(valet);
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
