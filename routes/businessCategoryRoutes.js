const express = require("express");

const BusinessCategory = require("../models/BusinessCategory");
const isSuperAdmin = require("../middlewares/requireSuperAdmin");
// const isBusinessOwner = require("../middlewares/requiredBusinessOwner");
const BusinessOwner = require("../models/BusinessOwner");

const router = express.Router();

// CREATE CATEGORY OF BUSINESS Access to Super Admin
router.post("/api/v1/categories", isSuperAdmin, async (req, res) => {
  const { name, details } = req.body;
  const adminId = req.admin._id;
  const date = new Date().toLocaleDateString().split("/").reverse();
  try {
    const businessCategory = new BusinessCategory({
      name: name,
      details: details,
      adminId: adminId,
      createdAt: new Date(date[0], date[2], date[1]),
    });
    await businessCategory.save();
    res.status(200).json(businessCategory);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// // READ ALL CATEGORIES OF BUSINESS Access to Business Owner
// router.get("/api/v1/owner/categories", isBusinessOwner, async (req, res) => {
//   try {
//     const businessCategory = await BusinessCategory.find({});
//     res.status(200).json(businessCategory);
//   } catch (err) {
//     return res.status(500).json({ error: err.message });
//   }
// });

// READ ALL CATEGORIES OF BUSINESS Access to Super Admin
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

router.get("/api/v1/categories/:id/owners", isSuperAdmin, async (req, res) => {
  try {
    const owners = await BusinessOwner.find({ categoryId: req.params.id });
    const ownersdata = owners.map((own) => ({
      businesses: own.businesses,
      reqbusinesses: own.reqbusinesses,
      name: own.name,
      email: own.email,
    }));
    res.send(ownersdata);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
