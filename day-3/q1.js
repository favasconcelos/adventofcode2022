const { readFile } = require("../utils/input");

const LOWERCASE_DIFF = 96;
const UPPERCASE_DIFF = 38;

async function main() {
  let sum = 0;

  function isUppercase(character = "") {
    return character === character.toUpperCase();
  }

  function getPriority(character = "") {
    const uppercased = isUppercase(character);
    if (uppercased) {
      return character.charCodeAt(0) - UPPERCASE_DIFF;
    } else {
      return character.charCodeAt(0) - LOWERCASE_DIFF;
    }
  }

  function findCommon(part1 = "", part2 = "") {
    const common = {};
    for (let letter of part1) {
      if (part2.indexOf(letter) !== -1) {
        common[letter] = true;
      }
    }
    return Object.keys(common);
  }

  function handleLine(line = "") {
    const middle = Math.floor(line.length / 2);
    const part1 = line.substring(0, middle);
    const part2 = line.substring(middle);
    const common = findCommon(part1, part2);

    sum = common.reduce((total, item) => {
      const priority = getPriority(item);
      return total + priority;
    }, sum);
  }
  await readFile(__dirname, "input.txt", handleLine);

  console.log({ sum });
}

main();
