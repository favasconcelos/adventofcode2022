const { readFile } = require("../utils/input");

async function main() {
  let sum = 0;

  function toSectionArray(section) {
    return section.split("-").map(Number);
  }

  function buildSections(line) {
    const [part1, part2] = line.split(",");
    return [toSectionArray(part1), toSectionArray(part2)];
  }

  function isContained(section1, section2) {
    const [section1Start, section1End] = section1;
    const [section2Start, section2End] = section2;

    // 5-7,7-9
    // 2-8,3-7
    // 6-6,4-6
    return (
      (section2Start <= section1End && section2Start >= section1Start) ||
      (section2End <= section1End && section2End >= section1Start) ||
      (section1Start <= section2End && section1Start >= section2Start) ||
      (section1End <= section2End && section1End >= section2Start)
    );
  }

  function handleLine(line) {
    const [section1, section2] = buildSections(line);
    if (isContained(section1, section2)) {
      console.log({ section1, section2 });
      sum++;
    }
  }

  await readFile(__dirname, "input.txt", handleLine);
  console.log({ sum });
}
main();
