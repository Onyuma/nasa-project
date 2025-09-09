const express = require("express");
const app = express();
const os = require("os");

function delay(duration) {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {
    // event loop is blocked here
  }
}
app.get("/", (req, res) => {
  res.status(200).json({
    pid: process.pid,
    cpus: os.cpus(),
  });
});

app.get("/perform", (req, res) => {
  delay(3000);
  res.send(`Yooh Yooh: PID - ${process.pid} `);
});

console.log(`Master Process started at: PID - ${process.pid}`);

app.listen(3000, () => {
  console.log(`Server listening to port 3000: PID - ${process.pid}`);
});
