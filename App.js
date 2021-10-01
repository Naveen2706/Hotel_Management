const prompt = require("prompt-sync")();
const Util = require("./src/utility/Util.js");

const utility = new Util();
customerDataArray = new Array();
flag = true;

console.log("\n Lobby of Hotel City Park");

do {
  let option = utility.menu();
  switch (option) {
    case 1:
      utility.registerUser(customerDataArray);
      break;
    case 2:
      utility.order();
      break;
    case 3:
    console.log("You Exited!");
      break;
    default:
      console.log("Invalid entry!");
      break;
  }
} while (flag);
