const { readFile } = require("../utils/input");

async function main() {
  let indexFound = false;

  function checkLetters(marker = "") {
    // console.log("checkLetters", { marker });
    for (let i = 0; i < marker.length; i++) {
      for (let j = i + 1; j < marker.length; j++) {
        if (marker[i] === marker[j]) {
          return false;
        }
      }
    }
    return true;
  }

  function handleLine(line = "") {
    for (let index = 14; index < line.length - 1; index++) {
      const possibleMarker = line.substring(index - 14, index);
      if (checkLetters(possibleMarker)) {
        indexFound = index;
        break;
      }
    }
  }

  await readFile(__dirname, "input.txt", handleLine);
  console.log({ indexFound });
}
main();
