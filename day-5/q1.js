const { readFile } = require("../utils/input");
const { set, get } = require("lodash");

function isMoveOperation(line = "") {
  return line.startsWith("move");
}

function isCrateOperation(line = "") {
  return line.indexOf("[") !== -1;
}

async function main() {
  const buckets = {};

  function processMove(line = "") {
    // console.log("\nprocessMove");
    const match = [...line.matchAll(/move (\d*) from (\d*) to (\d*)/gim)][0];
    const [, cratesToMove, fromBucketIndex, toBucketIndex] = match;
    // console.log(buckets);
    // console.log({ cratesToMove, fromBucketIndex, toBucketIndex });
    for (let move = 0; move < cratesToMove; move++) {
      const crate = buckets[fromBucketIndex].pop();
      buckets[toBucketIndex].push(crate);
    }
  }

  function processCrate(line = "") {
    // console.log("processCrate");
    const match = [...line.matchAll(/\[(\w)\]/gim)];
    match.forEach((item) => {
      const [, letter] = item;
      const bucketIndex = item.index / 4 + 1;
      const bucket = get(buckets, bucketIndex, []);
      set(buckets, bucketIndex, [letter, ...bucket]);
    });
  }

  function handleLine(line) {
    // console.log("handleLine", line);
    if (isMoveOperation(line)) {
      processMove(line);
    } else if (isCrateOperation(line)) {
      processCrate(line);
    }
  }

  await readFile(__dirname, "input.txt", handleLine);
  console.log("\nResult:");
  console.log({ buckets });
}
main();

// const arr = [..."[L] [C]     [M]     [T]     [W] [L]".matchAll(/\[(\w)\]/gim)];
// arr.forEach((item) => {
//   console.log(item);
//   console.log(item.index / 4 + 1);
// });
