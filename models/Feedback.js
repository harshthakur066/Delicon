const mongoose = require("mongoose");

const { Schema } = mongoose;

const FeedbackSchema = new Schema({
  custName: String,
  mobno: String,
  email: String,
  feedback: { type: Array, default: [] },
  createdAt: Date,
  businessId: String,
  orderId: String,
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
