const mongoose = require("mongoose");

const { Schema } = mongoose;

const feedbackQuestionSchema = new Schema({
  question: String,
  type: String,
  ownerId: String,
  businessId: String,
});

module.exports = mongoose.model("FeedbackQuestion", feedbackQuestionSchema);
