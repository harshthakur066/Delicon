const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");
const isBusinessOwner = require("../middlewares/requiredBusinessOwner");

// To Post New Dishes for Owner
router.post("/api/v1/feedback", async (req, res) => {
  const { custName, mobno, email, feedback, businessId, orderId, createdAt } = req.body;
  try {
    const feed = new Feedback({
      custName,
      mobno,
      email,
      feedback,
      businessId,
      orderId,
      createdAt,
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
