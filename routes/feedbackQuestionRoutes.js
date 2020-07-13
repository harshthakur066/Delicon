const express = require("express");

const FeedbackQuestion = require("../models/FeedbackQuestion");
const isBusinessOwner = require("../middlewares/requiredBusinessOwner");
const isStaff = require("../middlewares/requireStaff");

const router = express.Router();

// CREATE feedback question Access to Business Owner
router.post(
  "/api/v1/feedback/question/:businessId",
  isBusinessOwner,
  async (req, res) => {
    const { question, type } = req.body;
    const ownerId = req.owner._id;
    const businessId = req.params.businessId;
    try {
      const feedbackQues = new FeedbackQuestion({
        question: question,
        type: type,
        ownerId: ownerId,
        businessId,
      });
      await feedbackQues.save();
      res.status(200).json(feedbackQues);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

// READ ALL feedback question Access to Business Owner
router.get(
  "/api/v1/feedback/question/:businessId",
  isBusinessOwner,
  async (req, res) => {
    try {
      const feedbackQues = await FeedbackQuestion.find({
        businessId: req.params.businessId,
      });
      res.status(200).json(feedbackQues);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

// READ ALL feedback question Access to Staff
router.get(
  "/api/v1/staff/feedback/question/:businessId",
  isStaff,
  async (req, res) => {
    try {
      const feedbackQues = await FeedbackQuestion.find({
        businessId: req.params.businessId,
      });
      res.status(200).json(feedbackQues);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

// READ PARTICULAR feedback question Access to Business Owner
router.get(
  "/api/v1/feedback/question/:id",
  isBusinessOwner,
  async (req, res) => {
    const id = req.params.id;
    try {
      const feedbackQues = await FeedbackQuestion.findById(id);
      res.status(200).json(feedbackQues);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

// UPDATE feedback question Access to Business Owner
router.put(
  "/api/v1/feedback/question/:id",
  isBusinessOwner,
  async (req, res) => {
    const id = req.params.id;
    const { question, type } = req.body;
    let update = { question: question, type: type };
    try {
      const feedbackQues = await FeedbackQuestion.findByIdAndUpdate(id, update);
      res.status(200).json(feedbackQues);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

// DELETE feedback ques Access to Super Admin
router.delete(
  "/api/v1/feedback/question/:id",
  isBusinessOwner,
  async (req, res) => {
    const id = req.params.id;
    try {
      const feedbackQues = await FeedbackQuestion.findByIdAndDelete(id);
      res.status(200).send("Deleted");
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
