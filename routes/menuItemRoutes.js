const express = require("express");
const router = express.Router();
const MenuCategory = require("../models/MenuCategory");
const MenuItem = require("../models/MenuItem");
const isBusinessOwner = require("../middlewares/requiredBusinessOwner");
const isStaff = require("../middlewares/requireStaff");

// To Post New Dishes for Owner
router.post(
  "/api/v1/menu/items/:categoryId",
  isBusinessOwner,
  async (req, res) => {
    const { name, details, price, createdAt } = req.body;
    const ownerId = req.owner._id;
    const categoryId = req.params.categoryId;
    try {
      const dish = new MenuItem({
        name,
        details,
        price,
        ownerId,
        categoryId,
        createdAt,
      });
      await dish.save();
      try {
        const currentCatagory = await MenuCategory.findById(categoryId);
        currentCatagory.items.push(dish._id);
        await MenuCategory.findByIdAndUpdate(categoryId, currentCatagory);
        res.json(dish);
      } catch (err) {
        console.log(err);
        res.status(500).json({
          error: err.message,
          message: "Error while adding id to Staff!",
        });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

// To get all items of a category for Business Owner
router.get(
  "/api/v1/menu/items/:categoryId",
  isBusinessOwner,
  async (req, res) => {
    const categoryId = req.params.categoryId;
    try {
      const items = await MenuItem.find({ categoryId });
      res.send(items);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

// To get all items of a category for Staff
router.get("/api/v1/menu/staffitems/:categoryId", isStaff, async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    const items = await MenuItem.find({ categoryId });
    res.send(items);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// To get a perticular dish for business Owner
router.get(
  "/api/v1/menu/items/:categoryId/:id",
  isBusinessOwner,
  async (req, res) => {
    const id = req.params.id;
    try {
      const items = await MenuItem.findById(id);
      res.send(items);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

// To update any other info
router.put("/api/v1/menu/items/:id", isBusinessOwner, async (req, res) => {
  const { name, details, price } = req.body;
  const id = req.params.id;
  try {
    const update = {
      name,
      details,
      price,
    };
    const dish = await MenuItem.findByIdAndUpdate(id, update);
    res.send(dish);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

//To delete a particular dish
router.delete(
  "/api/v1/menu/items/:categoryId/:id",
  isBusinessOwner,
  async (req, res) => {
    const id = req.params.id;
    const categoryId = req.params.categoryId;
    try {
      const dish = await MenuItem.findByIdAndDelete(id);
      try {
        const currentCatagory = await MenuCategory.findById(categoryId);
        currentCatagory.items = currentCatagory.items.filter(
          (dishId) => dishId != id
        );
        await MenuCategory.findByIdAndUpdate(categoryId, currentCatagory);
        res.send(dish);
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
