const { ApolloServer } = require("apollo-server-lambda");
const mongoose = require("mongoose");
const db = require("./db/Models");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutations");
const Date = require("./resolvers/Scalars");
const typeDefs = require("./typedefs");

async function start() {
  const mongoClient = await mongoose.connect(
    "mongodb+srv://chris:1234@cluster0-ib5ri.gcp.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  mongoose.connection.on("error", function(err) {
    console.log("Mongoose default connection error: " + err);
  });
  return true;
}

const resolvers = {
  Query,
  Mutation,
  Date
};

const server = new ApolloServer({
  typeDefs,
  resolvers,

  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
    db
  }),
  playground: {
    settings: {
      "request.credentials": "same-origin"
    }
  }
});

exports.QLHandler = (event, context, callback) => {
  console.log(event, context, callback);
  context.callbackWaitsForEmptyEventLoop = false;
  start().then(() =>
    server.createHandler({
      cors: {
        origin: "*",
        credentials: true
      }
    })(event, context, callback)
  );
};
