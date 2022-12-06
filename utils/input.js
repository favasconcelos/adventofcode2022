const fs = require("fs");
const readline = require("readline");
const path = require("path");
const events = require("events");

exports.readFile = async function (dir, fileName, onNewLine) {
  const inputFile = path.resolve(dir, fileName);
  const input = fs.createReadStream(inputFile);
  const interface = readline.createInterface({
    input,
  });
  interface.on("line", onNewLine);
  await events.once(interface, "close");
};
