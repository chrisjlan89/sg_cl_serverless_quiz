module.exports = {
  async sayHelloQuery(_, args, { db }) {
    return "HELLO STOVE...STEVE";
  },
  async allQuizes(_, args, { db }) {
    const res = await db.Quiz.find({});
    return res;
  }
};
