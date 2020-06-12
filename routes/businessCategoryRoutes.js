const express = require("express");

const BusinessCategory = require("../models/BusinessCategory");
const isSuperAdmin = require("../middlewares/requireSuperAdmin");
const isBusinessOwner = require("../middlewares/requiredBusinessOwner");

const router = express.Router();

// CREATE CATEGORY OF BUSINESS Access to Super Admin
router.post("/api/v1/categories", isSuperAdmin, async (req, res) => {
  const { name, details } = req.body;
  const adminId = req.admin._id;
  const date = new Date().toLocaleDateString().split("/").reverse().join("-");
  try {
    const businessCategory = new BusinessCategory({
      name: name,
      details: details,
      adminId: adminId,
      createdAt: date,
    });
    await businessCategory.save();
    res.status(200).json(businessCategory);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// READ ALL CATEGORIES OF BUSINESS Access to Super Admin
router.get("/api/v1/owner/categories", isBusinessOwner, async (req, res) => {
  try {
    const businessCategory = await BusinessCategory.find({});
    res.status(200).json(businessCategory);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.get("/api/v1/categories", isSuperAdmin, async (req, res) => {
  try {
    const businessCategory = await BusinessCategory.find({});
    res.status(200).json(businessCategory);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// READ PARTICULAR CATEGORY OF BUSINESS Access to Super Admin
router.get("/api/v1/categories/:id", isSuperAdmin, async (req, res) => {
  const id = req.params.id;
  try {
    const businessCategory = await BusinessCategory.findById(id);
    res.status(200).json(businessCategory);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// UPDATE CATEGORY OF BUSINESS Access to Super Admin
router.put("/api/v1/categories/:id", isSuperAdmin, async (req, res) => {
  const id = req.params.id;
  const { name, details } = req.body;
  let update = { name: name, details: details };
  try {
    const businessCategory = await BusinessCategory.findByIdAndUpdate(
      id,
      update
    );
    res.status(200).json(businessCategory);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// DELETE CATEGORY OF BUSINESS Access to Super Admin
router.delete("/api/v1/categories/:id", isSuperAdmin, async (req, res) => {
  const id = req.params.id;
  try {
    const businessCategory = await BusinessCategory.findByIdAndDelete(id);
    res.status(200).send("Deleted");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
