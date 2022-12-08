const { readFile } = require("../utils/input");

const ENTRY_TYPE = {
  DIR: "dir",
  FILE: "file",
};

const COMMANDS = {
  CD: "cd",
  LS: "ls",
  DIR: "dir",
  FILE: "file",
};

const SUB_DIR_IDS = {
  ROOT: "/",
  BACK: "..",
};

function commandIdentifier(line = "") {
  if (line.startsWith("$ cd")) {
    return COMMANDS.CD;
  } else if (line.startsWith("$ ls")) {
    return COMMANDS.LS;
  } else if (line.startsWith("dir")) {
    return COMMANDS.DIR;
  } else if (/^\d/.test(line)) {
    return COMMANDS.FILE;
  }
  return null;
}

function printEntry(entry, level = 0) {
  const spacer = " ".repeat(level * 2);
  switch (entry.type) {
    case ENTRY_TYPE.FILE:
      console.log(
        `${spacer}- ${entry.name} (${entry.type}, size=${entry.size})`
      );
      return;
    case ENTRY_TYPE.DIR:
      console.log(
        `${spacer}- ${entry.name} (${entry.type}, size=${entry.size})`
      );
      Object.values(entry.childrens).forEach((item) =>
        printEntry(item, level + 1)
      );
      return;
  }
}

async function main() {
  let fileSystem = {
    root: {
      name: "/",
      size: 0,
      childrens: {},
      type: ENTRY_TYPE.DIR,
    },
  };
  let currentParent = null;

  function handleCD(line = "") {
    const dirName = line.substring(5);
    switch (dirName) {
      case SUB_DIR_IDS.ROOT:
        currentParent = fileSystem.root;
        return;
      case SUB_DIR_IDS.BACK:
        currentParent = currentParent.parent;
        return;
      default:
        currentParent = currentParent.childrens[dirName];
        break;
    }
  }

  function handleDIR(line = "") {
    const dirName = line.substring(4);
    const entry = {
      type: ENTRY_TYPE.DIR,
      name: dirName,
      size: 0,
      parent: currentParent,
      childrens: [],
    };
    currentParent.childrens[dirName] = entry;
  }

  function handleFILE(line = "") {
    const [size, name] = line.split(" ");
    const entry = {
      type: ENTRY_TYPE.FILE,
      name,
      size: Number(size),
    };
    currentParent.childrens[name] = entry;
  }

  function handleLine(line = "") {
    const command = commandIdentifier(line);
    switch (command) {
      case COMMANDS.CD:
        return handleCD(line);
      case COMMANDS.DIR:
        return handleDIR(line);
      case COMMANDS.FILE:
        return handleFILE(line);
    }
  }

  function calculateSizes(entry) {
    switch (entry.type) {
      case ENTRY_TYPE.FILE:
        return entry.size;
      case ENTRY_TYPE.DIR:
        const total = Object.values(entry.childrens).reduce((sum, item) => {
          if (item.type === ENTRY_TYPE.FILE) {
            return sum + item.size;
          } else {
            return sum + calculateSizes(item);
          }
        }, 0);
        entry.size = total;
        return entry.size;
    }
  }

  let response = 0;
  function calculateReponse(folder) {
    if (folder.size <= 100000) {
      response += folder.size;
    }
    Object.values(folder.childrens)
      .filter((entry) => entry.type === ENTRY_TYPE.DIR)
      .forEach(calculateReponse);
  }

  await readFile(__dirname, "input.test.txt", handleLine);
  calculateSizes(fileSystem.root);
  calculateReponse(fileSystem.root);
  console.log({ response });
  // printEntry(fileSystem.root);
}

main();
