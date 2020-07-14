const express = require("express");

const Order = require("../models/Order");
const isStaff = require("../middlewares/requireStaff");

const router = express.Router();

// CREATE Order Access to Staff
router.post("/api/v1/orders/:businessId", isStaff, async (req, res) => {
  const {
    MenuItems,
    services,
    custId,
    custName,
    itemCount,
    staffName,
    mobno,
    email,
  } = req.body;
  const staffId = req.staff._id;
  const businessId = req.params.businessId;
  const date = new Date().toLocaleDateString().split("/").reverse();
  try {
    const newOrder = new Order({
      custId,
      staffId,
      businessId,
      custName,
      createdAt: new Date(date[0], date[2], date[1]),
      MenuItems,
      services,
      mobno,
      email,
      itemCount,
      staffName,
    });
    await newOrder.save();
    res.status(200).json(newOrder);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// READ delivered Orders OF BUSINESS Access to Staff
router.get(
  "/api/v1/orders/:businessId/delivered",
  isStaff,
  async (req, res) => {
    const businessId = req.params.businessId;
    const delivered = true;
    try {
      const newOrder = await Order.find({ businessId, delivered });
      res.status(200).json(newOrder);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

// READ UNdelivered Orders OF BUSINESS Access to Staff
router.get(
  "/api/v1/orders/:businessId/undelivered",
  isStaff,
  async (req, res) => {
    const businessId = req.params.businessId;
    const delivered = false;
    try {
      const newOrder = await Order.find({ businessId, delivered });
      res.status(200).json(newOrder);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

//Read a perticular order access to Staff;
router.get("/api/v1/orders/:businessId/:orderId", isStaff, async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const newOrder = await Order.findById(orderId);
    res.status(200).json(newOrder);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

//Update an Order access to Staff
router.put("/api/v1/orders/:businessId/:orderId", isStaff, async (req, res) => {
  const orderId = req.params.orderId;
  const { MenuItems, services, custId } = req.body;
  try {
    const update = {
      custId,
      MenuItems,
      services,
    };
    const newOrder = await Order.findByIdAndUpdate(orderId, update);
    res.status(200).json(newOrder);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

//Mark an Order as delivered
router.put(
  "/api/v1/orders/:businessId/:orderId/delivered",
  isStaff,
  async (req, res) => {
    const orderId = req.params.orderId;
    try {
      const update = { delivered: true };
      const newOrder = await Order.findByIdAndUpdate(orderId, update);
      res.status(200).json(newOrder);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

//Mark an Order as Paid
router.put(
  "/api/v1/orders/:businessId/:orderId/paid",
  isStaff,
  async (req, res) => {
    const orderId = req.params.orderId;
    try {
      const update = { paid: true };
      const newOrder = await Order.findByIdAndUpdate(orderId, update, {
        new: true,
      });
      res.status(200).json(newOrder);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

//Delete a perticular order access to staff
router.delete(
  "/api/v1/orders/:businessId/:orderId",
  isStaff,
  async (req, res) => {
    const orderId = req.params.orderId;
    try {
      const newOrder = await Order.findByIdAndDelete(orderId);
      res.status(200).json(newOrder);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

//Get all Orders of a perticualr business
router.get("/api/v1/orders/:businessId", isStaff, async (req, res) => {
  const businessId = req.params.businessId;
  try {
    const newOrder = await Order.find({ businessId });
    res.status(200).json(newOrder);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
