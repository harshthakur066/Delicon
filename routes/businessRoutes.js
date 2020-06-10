const express = require("express");
const router = express.Router();

const Business = require("../models/Business");
const BusinessOwner = require("../models/BusinessOwner");

const isBusinessOwner = require("../middlewares/requiredBusinessOwner");

router.get("/api/v1/businesses", isBusinessOwner, async (req, res) => {
  const ownerId = req.owner._id;
  try {
    const businesses = await Business.find({ ownerId: ownerId });
    res.json(businesses);
  } catch (err) {
    console.log(err);
    res.json({ error: err.message });
  }
});

//For businessOwner and Admin to SHOW a perticular Business Access to Business Owner
router.get(
  "/api/v1/businesses/:businessId",
  isBusinessOwner,
  async (req, res) => {
    try {
      const { businessId } = req.params;
      const business = await Business.findById(businessId);
      res.json(business);
    } catch (err) {
      console.log(err);
      res.json({ error: err.message });
    }
  }
);

//For businessOwner and Admin to EDIT a perticular Business Access to Business Owner
router.put(
  "/api/v1/businesses/:businessId",
  isBusinessOwner,
  async (req, res) => {
    const { businessId } = req.params;
    let update = { name: req.body.name, details: req.body.details };
    try {
      const business = await Business.findByIdAndUpdate(businessId, update);
      res.json(business);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

// For businessOwner and Admin to DELETE a perticular Business Access to Business Owner
router.delete(
  "/api/v1/businesses/:businessId",
  isBusinessOwner,
  async (req, res) => {
    const businessId = req.params.businessId;
    const ownerId = req.owner._id;
    try {
      const business = await Business.findByIdAndDelete(businessId);
      try {
        const currentowner = await BusinessOwner.findById(ownerId);
        currentowner.businesses = currentowner.businesses.filter(
          (id) => id != businessId
        );
        await BusinessOwner.findByIdAndUpdate(ownerId, currentowner);
        res.json(business);
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
  }
);

module.exports = router;
