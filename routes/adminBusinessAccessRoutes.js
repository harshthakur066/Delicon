const express = require("express");
const router = express.Router();

const Business = require("../models/Business");
const BusinessOwner = require("../models/BusinessOwner");

const isSuperAdmin = require("../middlewares/requireSuperAdmin");

// For Business owner to request new Businesses  Access to Business Owner
router.post(
  "/api/v1/admin/businesses/:ownerId",
  isSuperAdmin,
  async (req, res) => {
    const { name, owner, address, details } = req.body;
    const ownerId = req.params.ownerId;
    const date = new Date().toLocaleDateString().split("/").reverse();
    try {
      const business = new Business({
        name: name,
        owner: owner,
        address: address,
        ownerId: ownerId,
        details: details,
        createdAt: new Date(date[0], date[2], date[1]),
      });
      await business.save();
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
  }
);

// Get all businesses of perticular owner access to super admin
router.get("/api/v1/admin/businesses", isSuperAdmin, async (req, res) => {
  const ownerId = req.owner._id;
  try {
    const businesses = await Business.find({ ownerId: ownerId });
    res.json(businesses);
  } catch (err) {
    console.log(err);
    res.json({ error: err.message });
  }
});

//For Super Admin to SHOW a perticular Business Access to Business Owner
router.get(
  "/api/v1/admin/businesses/:businessId",
  isSuperAdmin,
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

// For Super Admin to EDIT a perticular Business
router.put(
  "/api/v1/admin/businesses/:businessId",
  isSuperAdmin,
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

// For Super Admin to DELETE a perticular Business
router.delete(
  "/api/v1/admin/businesses/:businessId",
  isSuperAdmin,
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
