const bodyParser = require("body-parser");
const cors = require("cors");
const createQLServer = require("./createServer.js");

const server = createQLServer();

server.express.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
server.express.use(bodyParser.json());

server.express.use(cors());

server.start({ port: 4222 }, deets => {
  console.log(`server now running on port http://localhost:${deets.port}`);
});
