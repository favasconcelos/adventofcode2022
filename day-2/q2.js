const { readFile } = require("../utils/input");

const NEED = {
  LOSE: "lose",
  WIN: "win",
  DRAW: "draw",
};

const PLAYS = {
  ROCK: "rock",
  PAPER: "paper",
  SCISSORS: "scissors",
};

const COMPARE_SCORES = {
  [NEED.WIN]: 6,
  [NEED.LOSE]: 0,
  [NEED.DRAW]: 3,
};

const CHOICE_SCORE = {
  [PLAYS.ROCK]: 1,
  [PLAYS.PAPER]: 2,
  [PLAYS.SCISSORS]: 3,
};

const SCORE_STATE = {
  [PLAYS.ROCK]: {
    [NEED.WIN]: PLAYS.PAPER,
    [NEED.LOSE]: PLAYS.SCISSORS,
    [NEED.DRAW]: PLAYS.ROCK,
  },
  [PLAYS.PAPER]: {
    [NEED.WIN]: PLAYS.SCISSORS,
    [NEED.LOSE]: PLAYS.ROCK,
    [NEED.DRAW]: PLAYS.PAPER,
  },
  [PLAYS.SCISSORS]: {
    [NEED.WIN]: PLAYS.ROCK,
    [NEED.LOSE]: PLAYS.PAPER,
    [NEED.DRAW]: PLAYS.SCISSORS,
  },
};

const OPONENT_PLAYS = {
  A: PLAYS.ROCK,
  B: PLAYS.PAPER,
  C: PLAYS.SCISSORS,
};

const YOUR_NEED = {
  X: NEED.LOSE,
  Y: NEED.DRAW,
  Z: NEED.WIN,
};

async function main() {
  let yourScore = 0;
  function calculateMyScore(a, b) {
    const aChoice = OPONENT_PLAYS[a];
    const bChoice = YOUR_NEED[b];
    return (
      CHOICE_SCORE[SCORE_STATE[aChoice][bChoice]] + COMPARE_SCORES[bChoice]
    );
  }

  function processLine(line) {
    const [optionA, optionB] = line.split(" ");
    yourScore += calculateMyScore(optionA, optionB);
  }
  await readFile(__dirname, "input1.test.txt", processLine);
  console.log({ yourScore });
}

main();
