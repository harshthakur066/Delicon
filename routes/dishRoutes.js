const express = require("express");
const router = express.Router();
const MenuCategory = require("../models/MenuCategory");
const Dish = require("../models/Dish");
const isBusinessOwner = require("../middlewares/requiredBusinessOwner");

//To Post New Dishes for Owner
router.post(
  "/api/v1/menu/dishes/:categoryId",
  isBusinessOwner,
  async (req, res) => {
    const date = new Date().toLocaleDateString().split("/").reverse();
    const { name, details } = req.body;
    const ownerId = req.owner._id;
    const categoryId = req.params.categoryId;
    try {
      const dish = new Dish({
        name,
        details,
        ownerId,
        categoryId,
        createdAt: new Date(date[0], date[2], date[1]),
      });
      await dish.save();
      try {
        const currentCatagory = await MenuCategory.findById(categoryId);
        currentCatagory.dishes.push(dish._id);
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

// To get all dishes of a category for Business Owner
router.get(
  "/api/v1/menu/dishes/:categoryId",
  isBusinessOwner,
  async (req, res) => {
    const categoryId = req.params.categoryId;
    try {
      const dishes = await Dish.find({ categoryId });
      res.send(dishes);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

// To get a perticular dish for business Owner
router.get(
  "/api/v1/menu/dishes/:categoryId/:id",
  isBusinessOwner,
  async (req, res) => {
    const id = req.params.id;
    try {
      const dishes = await Dish.findById(id);
      res.send(dishes);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

// To update any other info
router.put(
  "/api/v1/menu/dishes/:categoryId/:id",
  isBusinessOwner,
  async (req, res) => {
    const { name, details } = req.body;
    const id = req.params.id;
    try {
      const update = {
        name,
        details,
      };
      const dish = await Dish.findByIdAndUpdate(id, update);
      res.send(dish);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

//To delete a particular dish
router.delete(
  "/api/v1/menu/dishes/:categoryId/:id",
  isBusinessOwner,
  async (req, res) => {
    const id = req.params.id;
    const categoryId = req.params.categoryId;
    try {
      const dish = await Dish.findByIdAndDelete(id);
      try {
        const currentCatagory = await MenuCategory.findById(categoryId);
        currentCatagory.dishes = currentCatagory.dishes.filter(
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
