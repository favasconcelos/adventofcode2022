const { readFile } = require("../utils/input");

const PLAYS = {
  ROCK: "rock",
  PAPER: "paper",
  SCISSORS: "scissors",
};

const COMPARE_SCORES = {
  WIN: 6,
  LOSE: 0,
  DRAW: 3,
};

const CHOICE_SCORE = {
  [PLAYS.ROCK]: 1,
  [PLAYS.PAPER]: 2,
  [PLAYS.SCISSORS]: 3,
};

const CHECK_WIN = {
  [PLAYS.ROCK]: {
    [PLAYS.SCISSORS]: COMPARE_SCORES.WIN,
    [PLAYS.PAPER]: COMPARE_SCORES.LOSE,
    [PLAYS.ROCK]: COMPARE_SCORES.DRAW,
  },
  [PLAYS.PAPER]: {
    [PLAYS.ROCK]: COMPARE_SCORES.WIN,
    [PLAYS.SCISSORS]: COMPARE_SCORES.LOSE,
    [PLAYS.PAPER]: COMPARE_SCORES.DRAW,
  },
  [PLAYS.SCISSORS]: {
    [PLAYS.PAPER]: COMPARE_SCORES.WIN,
    [PLAYS.ROCK]: COMPARE_SCORES.LOSE,
    [PLAYS.SCISSORS]: COMPARE_SCORES.DRAW,
  },
};

const OPONENT_PLAYS = {
  A: PLAYS.ROCK,
  B: PLAYS.PAPER,
  C: PLAYS.SCISSORS,
};

const YOUR_PLAYS = {
  X: PLAYS.ROCK,
  Y: PLAYS.PAPER,
  Z: PLAYS.SCISSORS,
};

async function main() {
  let oponentScore = 0;
  let yourScore = 0;
  function calculateScore(a, b) {
    const aChoice = OPONENT_PLAYS[a];
    const bChoice = YOUR_PLAYS[b];
    const aScore = CHECK_WIN[aChoice][bChoice] + CHOICE_SCORE[aChoice];
    const bScore = CHECK_WIN[bChoice][aChoice] + CHOICE_SCORE[bChoice];
    return [aScore, bScore];
  }

  function processLine(line) {
    const [optionA, optionB] = line.split(" ");
    const [aScore, bScore] = calculateScore(optionA, optionB);
    oponentScore += aScore;
    yourScore += bScore;
  }
  await readFile(__dirname, "input1.txt", processLine);
  console.log({ oponentScore, yourScore });
}

main();
