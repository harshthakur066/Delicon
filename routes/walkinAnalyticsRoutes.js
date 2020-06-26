const express = require("express");
const router = express.Router();
const WalkIn = require("../models/WalkIn");
const requireBusinessOwner = require("../middlewares/requiredBusinessOwner");

//For Business Owner to Show all walkIns
router.get(
  "/api/v1/analytics/walkins/owner",
  requireBusinessOwner,
  async (req, res) => {
    try {
      const walkIns = await WalkIn.find({ ownerId: req.owner._id });
      res.json(walkIns);
    } catch (err) {
      console.log(err);
      res.json({ error: err.message });
    }
  }
);

//For Business Owner to Show walkIns of a business
router.get(
  "/api/v1/analytics/walkins/business/:id",
  requireBusinessOwner,
  async (req, res) => {
    try {
      const walkIns = await WalkIn.find({
        businessId: req.params.id,
      });
      res.json(walkIns);
    } catch (err) {
      console.log(err);
      res.json({ error: err.message });
    }
  }
);

////For Business Owner to Show walkIns of a Staff
router.get(
  "/api/v1/analytics/walkins/staff/:id",
  requireBusinessOwner,
  async (req, res) => {
    try {
      const walkIns = await WalkIn.find({
        staffId: req.params.id,
      });
      res.json(walkIns);
    } catch (err) {
      console.log(err);
      res.json({ error: err.message });
    }
  }
);

//For Business Owner to SHOW a perticular WalkIn
router.get(
  "/api/v1/analytics/walkins/:WalkInId",
  requireBusinessOwner,
  async (req, res) => {
    try {
      const { WalkInId } = req.params;
      const WalkIn = await WalkIn.findById(WalkInId);
      res.json(WalkIn);
    } catch (err) {
      console.log(err);
      res.json({ error: err.message });
    }
  }
);

//For Business Owner to get walkIns on perticular date
router.get(
  "/api/v1/analytics/walkins/date/:datestring",
  requireBusinessOwner,
  async (req, res) => {
    const date = req.params.datestring.split("-");
    try {
      const walkIns = await WalkIn.find({
        createdAt: new Date(date[0], date[1], date[2]),
      });
      res.json(walkIns);
    } catch (err) {
      console.log(err);
      res.json({ error: err.message });
    }
  }
);

//For Business Owner to get walkIns between date range
router.get(
  "/api/v1/analytics/walkins/daterange/:datefrom/:dateto",
  requireBusinessOwner,
  async (req, res) => {
    const fromdate = req.params.datefrom.split("-");
    const todate = req.params.dateto.split("-");
    try {
      const walkIns = await WalkIn.find({
        createdAt: {
          $gte: new Date(fromdate[0], fromdate[1], fromdate[2]),
          $lte: new Date(todate[0], todate[1], todate[2]),
        },
      }).sort({ createdAt: 1 });
      res.json(walkIns);
    } catch (err) {
      console.log(err);
      res.json({ error: err.message });
    }
  }
);

module.exports = router;
