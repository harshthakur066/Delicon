const express = require("express");

const ServiceCategory = require("../models/ServiceCategoty");
const isBusinessOwner = require("../middlewares/requiredBusinessOwner");

const router = express.Router();

// CREATE CATEGORY OF service Access to Business Owner
router.post(
  "/api/v1/service/categories/:businessId",
  isBusinessOwner,
  async (req, res) => {
    const { name, details } = req.body;
    const ownerId = req.owner._id;
    const businessId = req.params.businessId;
    const date = new Date().toLocaleDateString().split("/").reverse();
    try {
      const serviceCategory = new ServiceCategory({
        name: name,
        details: details,
        ownerId: ownerId,
        businessId,
        createdAt: new Date(date[0], date[2], date[1]),
      });
      await serviceCategory.save();
      res.status(200).json(serviceCategory);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

// READ ALL CATEGORIES OF service Access to Business Owner
router.get(
  "/api/v1/service/categories/:businessId",
  isBusinessOwner,
  async (req, res) => {
    try {
      const serviceCategory = await ServiceCategory.find({
        businessId: req.params.businessId,
      });
      res.status(200).json(serviceCategory);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

// READ PARTICULAR CATEGORY OF service Access to Business Owner
router.get(
  "/api/v1/service/category/:id",
  isBusinessOwner,
  async (req, res) => {
    const id = req.params.id;
    try {
      const serviceCategory = await ServiceCategory.findById(id);
      res.status(200).json(serviceCategory);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

// UPDATE CATEGORY OF service Access to Business Owner
router.put(
  "/api/v1/service/category/:id",
  isBusinessOwner,
  async (req, res) => {
    const id = req.params.id;
    const { name, details } = req.body;
    let update = { name: name, details: details };
    try {
      const serviceCategory = await ServiceCategory.findByIdAndUpdate(
        id,
        update
      );
      res.status(200).json(serviceCategory);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

// DELETE CATEGORY OF BUSINESS Access to Super Admin
router.delete(
  "/api/v1/service/category/:id",
  isBusinessOwner,
  async (req, res) => {
    const id = req.params.id;
    try {
      const serviceCategory = await ServiceCategory.findByIdAndDelete(id);
      res.status(200).send("Deleted");
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
