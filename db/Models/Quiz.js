const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
  title: { type: String },
  description: { type: String },
  submittedBy: { type: String },
  createdOn: { type: Date },
  quizQuestions: [{ type: Schema.Types.ObjectId, ref: "quizquestions" }]
});

const Quiz = mongoose.models.quiz || mongoose.model("quiz", QuizSchema);

module.exports = Quiz;
