const fs = require("fs");
const prompt = require("prompt-sync")();

function login(name, uniqueKey) {
  const doc = fs.readFileSync("data.json");
  const docObj = JSON.parse(doc);
  for (let user in docObj) {
    if (
      (docObj[user].firstName === name && docObj[user].uniqueKey) === uniqueKey
    ) {
      const userDetailsObj = docObj[user];
      return userDetailsObj;
    }
  }

  // const str = JSON.stringify(docObj);
  // fs.writeFileSync("data.json", str);
}

// login("Pratik", "Prat9657");

function getObj() {
  const obj = login("Pratik", "Prat9657");
  console.log(obj);
}

getObj();

// docObj.forEach((element) => {
//   if (element.firstName == name && element.uniqueKey == uniqueKey) {
//     console.log("\nWelcome " + element.firstName + " " + element.lastName);
//     var sum = element.purchaseArray.reduce(function (a, b) {
//       return a + b;
//     }, 0);
//     element.purchaseArray = sum;
//   }
// });
