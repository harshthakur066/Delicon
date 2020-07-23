const express = require("express");

const MenuCategory = require("../models/MenuCategory");
const isBusinessOwner = require("../middlewares/requiredBusinessOwner");
const isStaff = require("../middlewares/requireStaff");

const router = express.Router();

// CREATE CATEGORY OF Menu Access to Business Owner
router.post(
  "/api/v1/menu/categories/:businessId",
  isBusinessOwner,
  async (req, res) => {
    const { name, details, createdAt } = req.body;
    const ownerId = req.owner._id;
    const businessId = req.params.businessId;
    try {
      const menuCategory = new MenuCategory({
        name: name,
        details: details,
        ownerId: ownerId,
        businessId,
        createdAt,
      });
      await menuCategory.save();
      res.status(200).json(menuCategory);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

// READ ALL CATEGORIES OF Menu Access to Business Owner
router.get(
  "/api/v1/menu/categories/:businessId",
  isBusinessOwner,
  async (req, res) => {
    try {
      const menuCategory = await MenuCategory.find({
        businessId: req.params.businessId,
      });
      res.status(200).json(menuCategory);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

// READ ALL CATEGORIES OF Menu Access to Staff
router.get(
  "/api/v1/menu/staffcategories/:businessId",
  isStaff,
  async (req, res) => {
    try {
      const menuCategory = await MenuCategory.find({
        businessId: req.params.businessId,
      });
      res.status(200).json(menuCategory);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

// READ PARTICULAR CATEGORY OF MENU Access to Business Owner
router.get("/api/v1/menu/category/:id", isBusinessOwner, async (req, res) => {
  const id = req.params.id;
  try {
    const menuCategory = await MenuCategory.findById(id);
    res.status(200).json(menuCategory);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// UPDATE CATEGORY OF MENU Access to Business Owner
router.put("/api/v1/menu/category/:id", isBusinessOwner, async (req, res) => {
  const id = req.params.id;
  const { name, details } = req.body;
  let update = { name: name, details: details };
  try {
    const menuCategory = await MenuCategory.findByIdAndUpdate(id, update);
    res.status(200).json(menuCategory);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// DELETE CATEGORY OF BUSINESS Access to Super Admin
router.delete(
  "/api/v1/menu/category/:id",
  isBusinessOwner,
  async (req, res) => {
    const id = req.params.id;
    try {
      const menuCategory = await MenuCategory.findByIdAndDelete(id);
      res.status(200).send("Deleted");
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
