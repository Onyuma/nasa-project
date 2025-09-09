const { createReadStream, stat } = require("fs");
const { parse } = require("csv-parse");
const path = require("path");
const stream = require("stream/promises");

const planets = [];

function planetPromise() {
  // These two block of codes below do the same thing....

  // return new Promise((resolve, reject) => {
  // createReadStream(path.join(__dirname, "..", "data", "siwes.csv"))
  //   .pipe(parse({ columns: true }))
  //   .on("data", (chunk) => {
  //     planets.push(chunk);
  //   })
  //   .on("error", (error) => {
  //     reject(error);
  //   })
  //   .on("end", () => {
  //     resolve();
  //   });
  // });

  return stream.pipeline(
    createReadStream(path.join(__dirname, "..", "data", "siwes.csv")),
    parse({ columns: true })
      .on("data", (chunk) => {
        planets.push(chunk);
      })
      .on("error", (error) => {
        console.log(error);
      })
  );
}

module.exports = { planets, planetPromise };
