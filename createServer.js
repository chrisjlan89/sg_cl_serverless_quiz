const { GraphQLServer } = require("graphql-yoga");
const mongoose = require("mongoose");
const db = require("./db/Models");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutations");
const Date = require("./resolvers/Scalars");
const connection = mongoose.connect(
  "mongodb+srv://chris:1234@cluster0-ib5ri.gcp.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("conneted")
);

const resolvers = {
  Query,
  Mutation,
  Date
};

const createQLServer = () =>
  new GraphQLServer({
    typeDefs: "./schema.graphql",
    resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => ({ ...req, db })
  });

module.exports = createQLServer;
