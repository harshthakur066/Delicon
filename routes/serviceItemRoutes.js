const express = require("express");
const router = express.Router();
const ServiceCatogary = require("../models/ServiceCategoty");
const ServiceItem = require("../models/ServiceItem");
const isBusinessOwner = require("../middlewares/requiredBusinessOwner");

//To Post New services for Owner
router.post(
  "/api/v1/service/items/:categoryId",
  isBusinessOwner,
  async (req, res) => {
    const date = new Date().toLocaleDateString().split("/").reverse();
    const { name, details, price } = req.body;
    const ownerId = req.owner._id;
    const categoryId = req.params.categoryId;
    try {
      const service = new ServiceItem({
        name,
        details,
        price,
        ownerId,
        categoryId,
        createdAt: new Date(date[0], date[2], date[1]),
      });
      await service.save();
      try {
        const currentCatagory = await ServiceCatogary.findById(categoryId);
        currentCatagory.items.push(service._id);
        await ServiceCatogary.findByIdAndUpdate(categoryId, currentCatagory);
        res.json(service);
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
  "/api/v1/service/items/:categoryId",
  isBusinessOwner,
  async (req, res) => {
    const categoryId = req.params.categoryId;
    try {
      const items = await ServiceItem.find({ categoryId });
      res.send(items);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

// To get a perticular service for business Owner
router.get(
  "/api/v1/service/items/:categoryId/:id",
  isBusinessOwner,
  async (req, res) => {
    const id = req.params.id;
    try {
      const items = await ServiceItem.findById(id);
      res.send(items);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

// To update any other info
router.put(
  "/api/v1/service/items/:categoryId/:id",
  isBusinessOwner,
  async (req, res) => {
    const { name, details, price } = req.body;
    const id = req.params.id;
    try {
      const update = {
        name,
        details,
        price,
      };
      const service = await ServiceItem.findByIdAndUpdate(id, update);
      res.send(service);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

//To delete a particular service
router.delete(
  "/api/v1/service/items/:categoryId/:id",
  isBusinessOwner,
  async (req, res) => {
    const id = req.params.id;
    const categoryId = req.params.categoryId;
    try {
      const service = await ServiceItem.findByIdAndDelete(id);
      try {
        const currentCatagory = await ServiceCatogary.findById(categoryId);
        currentCatagory.items = currentCatagory.items.filter(
          (serviceId) => serviceId != id
        );
        await ServiceCatogary.findByIdAndUpdate(categoryId, currentCatagory);
        res.send(service);
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
