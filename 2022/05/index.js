var fs = require("fs");

const CRATE_MOVER_MODEL = "CrateMover9000"; // or Part 2 mover model: "CrateMover9001"

const stacks = [
  ["N", "C", "R", "T", "M", "Z", "P"],
  ["D", "N", "T", "S", "B", "Z"],
  ["M", "H", "Q", "R", "F", "C", "T", "G"],
  ["G", "R", "Z"],
  ["Z", "N", "R", "H"],
  ["F", "H", "S", "W", "P", "Z", "L", "D,"],
  ["W", "D", "Z", "R", "C", "G", "M"],
  ["S", "J", "F", "L", "H", "W", "Z", "Q"],
  ["S", "Q", "P", "W", "N"],
];

var instructions = fs
  .readFileSync("instructions.txt")
  .toString()
  .split("\n")
  .map((item) =>
    item
      .split(" ")
      .filter((item) => parseInt(item))
      .map((numStr) => parseInt(numStr))
  );

function processInstructions(stks, inst, moverModel) {
  inst.forEach((instruction) => {
    let fromStack = stks[instruction[1] - 1];
    let toStack = stks[instruction[2] - 1];
    const numberOfCratesToMove = instruction[0];
    const cratesToMove = fromStack.slice(-numberOfCratesToMove);
    moverModel == "CrateMover9001" && cratesToMove.reverse();
    toStack.push(...cratesToMove);
    fromStack.splice(-numberOfCratesToMove);
  });
  return stacks.map((stack) => stack[stack.length - 1]).join("");
}

const result = processInstructions(stacks, instructions, CRATE_MOVER_MODEL);

console.log(result);
