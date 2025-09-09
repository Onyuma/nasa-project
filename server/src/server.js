const http = require("http");
require("dotenv").config();

const { planetPromise } = require("./models/planets.model");

const app = require("./app");

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

async function start() {
  await planetPromise();
  server.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
  });
}

start();
