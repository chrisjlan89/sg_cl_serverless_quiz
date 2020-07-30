const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  answer: { type: String },
  correct: { type: Boolean, default: false }
});

const Answer = mongoose.models.answer || mongoose.model("answer", AnswerSchema);

module.exports = Answer;
