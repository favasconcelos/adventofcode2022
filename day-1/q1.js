const fs = require("fs");
const readline = require("readline");
const path = require("path");
const events = require("events");

async function readFile(fileName, onNewLine) {
  const inputFile = path.resolve(__dirname, fileName);
  const input = fs.createReadStream(inputFile);
  const interface = readline.createInterface({
    input,
  });
  interface.on("line", onNewLine);
  await events.once(interface, "close");
}

async function main() {
  const elfs = {};
  let currentElf = null;

  function processLine(line) {
    console.log("processLine", { line });
    if (line === "") {
      currentElf += 1;
      return;
    } else if (currentElf === null) {
      currentElf = 1;
    }
    const value = Number(line);
    const currentValue = elfs[currentElf] ?? 0;
    elfs[currentElf] = currentValue + value;
  }

  await readFile("input1.txt", processLine);

  const elfsCalories = Object.values(elfs);
  elfsCalories.sort((a, b) => {
    return b - a;
  });

  const [top1, top2, top3] = elfsCalories;
  const sum = top1 + top2 + top3;

  console.log({ top1, top2, top3, sum });
}

main();
