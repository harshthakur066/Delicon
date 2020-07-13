const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");
const isBusinessOwner = require("../middlewares/requiredBusinessOwner");

// To Post New Dishes for Owner
router.post("/api/v1/feedback", async (req, res) => {
  const date = new Date().toLocaleDateString().split("/").reverse();
  const { custName, mobno, email, feedback, businessId, orderId } = req.body;
  try {
    const feed = new Feedback({
      custName,
      mobno,
      email,
      feedback,
      businessId,
      orderId,
      createdAt: new Date(date[0], date[2], date[1]),
    });
    await feed.save();
    res.send(feed);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

//Get feedbacks of a business
router.get(
  "/api/v1/feedback/:businessId",
  isBusinessOwner,
  async (req, res) => {
    const businessId = req.params.businessId;
    try {
      const feeds = await Feedback.find({ businessId });
      res.send(feeds);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
