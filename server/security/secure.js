const https = require("https");
const fs = require("fs");
const path = require("path");
const { app } = require("./appp");

const httpsServer = https.createServer(
  {
    cert: fs.readFileSync(path.join(__dirname, "cert.pem")),
    key: fs.readFileSync(path.join(__dirname, "key.pem")),
  },
  app
);

httpsServer.listen(3000, () => {
  console.log("Server listening to port 3000");
});
