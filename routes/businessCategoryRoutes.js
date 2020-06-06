const express = require("express");

const BusinessCategory = require("../models/BusinessCategory");
const isSuperAdmin = require("../middlewares/requireSuperAdmin");

const router = express.Router();

router.use(isSuperAdmin);

// CREATE CATEGORY OF BUSINESS
router.post(
  "/api/v1/admin/category/buisness/create",
  isSuperAdmin,
  async (req, res) => {
    const { name, details } = req.body;
    try {
      const businessCategory = new BusinessCategory({
        name: name,
        details: details,
      });
      await businessCategory.save();
      res.status(200).send("Saved to database");
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

// READ ALL CATEGORIES OF BUSINESS
router.get(
  "/api/v1/admin/category/buisness/read",
  isSuperAdmin,
  async (req, res) => {
    try {
      const businessCategory = await BusinessCategory.find();
      res.status(200).json(businessCategory);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

// READ PARTICULAR CATEGORY OF BUSINESS
router.get(
  "/api/v1/admin/category/buisness/:id/read",
  isSuperAdmin,
  async (req, res) => {
    const id = req.params.id;
    try {
      const businessCategory = await BusinessCategory.findById(id);
      res.status(200).json(businessCategory);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

// UPDATE CATEGORY OF BUSINESS
router.put(
  "/api/v1/admin/category/buisness/:id/update",
  isSuperAdmin,
  async (req, res) => {
    const id = req.params.id;
    const { name, details } = req.body;
    try {
      const businessCategory = await BusinessCategory.updateOne(
        { _id: id },
        { $set: { name: name, details: details } },
        { new: true }
      ).exec();
      res.status(200).json(businessCategory);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

// DELETE CATEGORY OF BUSINESS
router.delete(
  "/api/v1/admin/category/buisness/:id/delete",
  isSuperAdmin,
  async (req, res) => {
    const id = req.params.id;
    try {
      const businessCategory = await BusinessCategory.findById(id);
      await businessCategory.remove();
      res.status(200).send("Deleted");
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
