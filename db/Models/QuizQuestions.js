"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuizQuestionsSchema = new mongoose.Schema({
  question: { type: String },

  answers: [{ type: Schema.Types.ObjectId, ref: "answer" }]
});
const QuizQuestions =
  mongoose.models.quizquestions ||
  mongoose.model("quizquestions", QuizQuestionsSchema);
module.exports = QuizQuestions;
