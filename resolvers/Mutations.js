const moment = require("moment");
module.exports = {
  async sayHelloMutation(_, args, { db }) {
    return "HELLO STOVE...STEVE...mutaiton tho";
  },
  async createQuizMutation(_, args, { db }) {
    console.log(args);
    const { QuizInput } = args;
    const QuizObj = {
      ...QuizInput,
      createdOn: moment().format("MM-DD-YYYY hh:mm:ss a")
    };
    console.log(db, args);
    const res = await db.Quiz.create(QuizObj);
    return res;
  },

  async createQuizQuestions(_, args, { db }) {
    console.log(args, db);
    const { QuizQuestionInput, QuizId } = args;
    const { question, answers } = QuizQuestionInput;
    console.log(QuizQuestionInput, db, QuizId);

    const createQuizAnswers = async answer => {
      const singleAnswerRes = await db.Answer.create(answer);
      return singleAnswerRes._id;
    };

    function parallel(tasks, fn) {
      return Promise.all(tasks.map(task => fn(task)));
    }

    const answersRes = await parallel(answers, createQuizAnswers);

    console.log(answersRes);
    const quizObj = {
      question,
      answers: answersRes
    };

    const quizQuestionsRes = await db.QuizQuestions.create(quizObj);

    const updatedQuiz = await db.Quiz.findOneAndUpdate(
      { _id: QuizId },
      {
        $addToSet: { quizQuestions: quizQuestionsRes }
      }
    );
    console.log(quizQuestionsRes, "qqrez");

    // await Promise.all(d.model.crete());
    // for each answer in Answer Array
  }
};
