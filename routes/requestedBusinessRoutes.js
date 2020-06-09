const express = require("express");
const router = express.Router();

const RequestedBusiness = require("../models/RequestedBusiness");
const BusinessOwner = require("../models/BusinessOwner");

const isBusinessOwner = require("../middlewares/requiredBusinessOwner");
const isSuperAdmin = require("../middlewares/requireSuperAdmin");

// For Business owner to request new Businesses
router.post("/api/v1/businesses/request", isBusinessOwner, async (req, res) => {
  const { name, owner, address, details } = req.body;
  const ownerId = req.owner._id;
  var dateobj = new Date().toISOString();
  try {
    const requestBusiness = new RequestedBusiness({
      name: name,
      owner: owner,
      address: address,
      ownerId: ownerId,
      details: details,
      createdAt: dateobj,
    });
    await requestBusiness.save();
    try {
      const currentowner = await BusinessOwner.findById(ownerId);
      currentowner.businesses.push(business._id);
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
});

// To GET all requested business
router.get("/api/v1/businesses", isSuperAdmin, async (req, res) => {
  try {
    const requestedBusiness = await RequestedBusiness.find();
    res.json(requestedBusiness);
  } catch (err) {
    console.log(err);
    res.json({ error: err.message });
  }
});

module.exports = router;
