const { readFile } = require("../utils/input");

const LOWERCASE_DIFF = 96;
const UPPERCASE_DIFF = 38;

async function main() {
  let lines = [];
  let count = 0;
  let sum = 0;

  function isUppercase(character = "") {
    return character === character.toUpperCase();
  }

  function getPriority(character = "") {
    if (isUppercase(character)) {
      return character.charCodeAt(0) - UPPERCASE_DIFF;
    } else {
      return character.charCodeAt(0) - LOWERCASE_DIFF;
    }
  }

  function findCommon(part1 = "", part2 = "", part3 = "") {
    const common = {};
    for (let letter of part1) {
      if (part2.indexOf(letter) !== -1 && part3.indexOf(letter) !== -1) {
        common[letter] = true;
      }
    }
    return Object.keys(common);
  }

  function handleLine(line = "") {
    lines.push(line);
    count++;

    if (count === 3) {
      const [line1, line2, line3] = lines;
      const common = findCommon(line1, line2, line3);

      sum = common.reduce((total, item) => {
        const priority = getPriority(item);
        return total + priority;
      }, sum);

      count = 0;
      lines = [];
    }
  }
  await readFile(__dirname, "input.txt", handleLine);

  console.log({ sum });
}

main();
