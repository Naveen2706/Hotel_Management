const prompt = require("prompt-sync")();
const Utility = require("./src/utility/Utility.js");

const utility = new Utility();
// customerDataArray = new Array();
flag = true;

console.log("\nWelcome to the Hotel management program");

do {
  let option = utility.menu();
  switch (option) {
    case 1:
      utility.registerUser();
      break;
    case 2:
      utility.order();
      break;
    case 3:
      flag = false;
      break;
    default:
      console.log("Invalid input!");
      break;
  }
} while (flag);


