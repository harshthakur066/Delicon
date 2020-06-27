const express = require("express");
const router = express.Router();
const Valets = require("../models/Valets");
const requireBusinessOwner = require("../middlewares/requiredBusinessOwner");

//For Business Owner to Show all valets
router.get(
  "/api/v1/analytics/valets/owner",
  requireBusinessOwner,
  async (req, res) => {
    try {
      const valets = await Valets.find({ ownerId: req.owner._id });
      res.json(valets);
    } catch (err) {
      console.log(err);
      res.json({ error: err.message });
    }
  }
);

//For Business Owner to Show valets of a business
router.get(
  "/api/v1/analytics/valets/business/:id",
  requireBusinessOwner,
  async (req, res) => {
    try {
      const valets = await Valets.find({
        businessId: req.params.id,
      });
      res.json(valets);
    } catch (err) {
      console.log(err);
      res.json({ error: err.message });
    }
  }
);

////For Business Owner to Show valets of a Staff
router.get(
  "/api/v1/analytics/valets/staff/:id",
  requireBusinessOwner,
  async (req, res) => {
    try {
      const valets = await Valets.find({
        staffId: req.params.id,
      });
      res.json(valets);
    } catch (err) {
      console.log(err);
      res.json({ error: err.message });
    }
  }
);

//For Business Owner to SHOW a perticular Valets
router.get(
  "/api/v1/analytics/valets/valets/:ValetsId",
  requireBusinessOwner,
  async (req, res) => {
    try {
      const { ValetsId } = req.params;
      const Valets = await Valets.findById(ValetsId);
      res.json(Valets);
    } catch (err) {
      console.log(err);
      res.json({ error: err.message });
    }
  }
);

//For Business Owner to get valets on perticular date
router.get(
  "/api/v1/analytics/valets/date/:datestring",
  requireBusinessOwner,
  async (req, res) => {
    const date = req.params.datestring.split("-");
    try {
      const valets = await Valets.find({
        createdAt: new Date(date[0], date[1], date[2]),
      });
      res.json(valets);
    } catch (err) {
      console.log(err);
      res.json({ error: err.message });
    }
  }
);

//For Business Owner to get valets between date range
router.get(
  "/api/v1/analytics/valets/daterange/:datefrom/:dateto",
  requireBusinessOwner,
  async (req, res) => {
    const fromdate = req.params.datefrom.split("-");
    const todate = req.params.dateto.split("-");
    try {
      const valets = await Valets.find({
        createdAt: {
          $gte: new Date(fromdate[0], fromdate[1], fromdate[2]),
          $lte: new Date(todate[0], todate[1], todate[2]),
        },
      }).sort({ createdAt: 1 });
      res.json(valets);
    } catch (err) {
      console.log(err);
      res.json({ error: err.message });
    }
  }
);

module.exports = router;
