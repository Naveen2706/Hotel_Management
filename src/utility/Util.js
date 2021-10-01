const Customer = require("./Customer");
const Orders = require("./Orders");
const prompt = require("prompt-sync")();
const fs = require("fs");

class Util {
  menu = () => {
    console.log("\nPress 1 - Registration");
    console.log("Press 2 - Login");
    console.log("\nPress 3 - Exit\n");
    return parseInt(prompt("Enter your choice : "));
  };

  //Register customer
  registerUser = (dataArray) => {
    let customer = new Customer();
    console.log("");
    customer.fName = prompt("Enter first name : ");
    customer.lName = prompt("Enter last name : ");
    customer.gender = prompt("Enter gender : ");
    customer.mNumber = prompt("Enter mobile number : ");
    customer.durationOfStay = prompt("Enter duration of stay (in days) : ");
    customer.key = this.generateKey(
      customer.fName,
      customer.mNumber
    );
    customer.orders = [];
    this.write(customer);
    console.log(
      "\n" +
        customer.fName +
        " " +
        customer.lastName +
        " registered successfully"
    );
  };

  //Write customer info onto JSON file
  write = (customer) => {
    const doc = fs.readFileSync("D:/HotelManagement/json/data.json");
    if (doc.length == 0) {
      const customerStr = JSON.stringify(customer);
      fs.writeFileSync("D:/HotelManagement/json/data.json", customerStr);
    } else {
      const detailObj = JSON.parse(doc);
      detailObj.push(customer);
      const str = JSON.stringify(detailObj);
      fs.writeFileSync("D:/HotelManagement/json/data.json", str);
    }
  };

  //Generate unique key for customer
  generateKey = (name, number) => {
    return name.substring(0, 4) + number.substring(0, 4);
  };

  login() {
    console.log(
      "\n( Your key is first 2 char of your name and mobile number)"
    );
    let name = prompt("Enter your username : ");
    let key = prompt("Enter key : ");
    const doc = fs.readFileSync("D:/HotelManagement/json/data.json");
    const detailObj = JSON.parse(doc);
    for (let user in detailObj) {
      if (
        (detailObj[user].firstName === name && detailObj[user].key) ===
        key
      ) {
        const userDetailsObj = detailObj[user];
        return userDetailsObj;
      } else if (name == "Admin" && key == "admin123") {
        console.log("\nWelcome Admin");
        this.adminLogin();
      }
    }
  }

  order = () => {
    const loginObject = this.login();
    let option = 0;
    do {
      console.log("\nPress 1 - Order food");
      console.log("Press 2 - Order services");
      console.log("Press 3 - Check out");
      console.log("Press 4 - Log out\n");
      option = parseInt(prompt("Enter your choice : "));
      switch (option) {
        case 1:
          this.orderFood(loginObject);
          break;
        case 2:
          this.orderServices(loginObject);
          break;
        case 3:
          console.log("Not implemented yet");
          break;
        default:
          console.log();
          break;
      }
    } while (option != 4);
  };

  orderFood = (loginObject) => {
    let foodArray = new Array();
    let option = 0;
    do {
      console.log("\nPress 1 - Order Coffee ");
      console.log("Press 2 - Order Breakfast ");
      console.log("Press 3 - Order Lunch ");
      console.log("Press 4 - Order Dinner ");
      console.log("Press 5 - Confirm Order");
      console.log("Press 6 - Back\n");
      option = parseInt(prompt("Enter your choice : "));

      switch (option) {
        case 1:
          foodArray.push(new Orders("Coffee", 1, 20, 20));
          console.log("\nItem added in cart.");
          break;
        case 2:
          foodArray.push(new Orders("Breakfast", 1, 100, 100));
          console.log("\nItem added in cart.");
          break;
        case 3:
          foodArray.push(new Orders("Lunch", 1, 200, 200));
          console.log("\nItem added in cart.");
          break;
        case 4:
          foodArray.push(new Orders("Dinner", 1, 300, 300));
          console.log("\nItem added in cart.");
          break;
        case 5:
          let confirm = prompt("Enter key to confirm order : ");
          this.orderFinal(confirm, foodArray);
          break;
      }
    } while (option != 6);
  };

  orderServices = (loginObject) => {
    let serviceArray = new Array();
    let option = 0;
    do {
      console.log("\nPress 1 - Laundry (200rs)");
      console.log("Press 2 - Tour (500rs)");
      console.log("Press 3 - Rent car (3500rs)");
      console.log("Press 4 - Confirm order");
      console.log("Press 5 - Back\n");
      let orderFoodArray = new Array();
      option = parseInt(prompt("Enter your choice : "));
      switch (option) {
        case 1:
          serviceArray.push(new Orders("Laundry", 1, 200, 200));
          console.log("\nItem added in cart.");
          break;
        case 2:
          serviceArray.push(new Orders("Tour", 1, 500, 500));
          console.log("\nItem added in cart.");
          break;
        case 3:
          serviceArray.push(new Orders("Car", 1, 3500, 3500));
          console.log("\nItem added in cart.");
          break;
        case 4:
          let key2 = prompt("Enter key to confirm order : ");
          this.orderFinal(key2, serviceArray);
          break;
      }
    } while (option != 5);
  };

  generateBill = (key) => {
    const doc = fs.readFileSync("D:/HotelManagement/json/data.json");
    const detailObj = JSON.parse(doc);
    detailObj.forEach((element) => {
      if (element.key == key) {
  
      }
    });
  };

  adminLogin = () => {
    console.log("\nPress 1 - Print Bill");
    console.log("Press 2 - View Customers");
    console.log("Press 3 - To leave\n");
    let option = parseInt(prompt("Enter your choice : "));
    if (option == 1) {
      let key = prompt("Enter key to confirm : ");
      console.log(" Bill : " + this.generateBill(key));
    } else if (option == 2) {
      const doc = fs.readFileSync("D:/HotelManagement/json/data.json");
      const detailObj = JSON.parse(doc);
      console.log(detailObj);
    } else this.login();
  };

  orderFinal = (key, orders) => {
    const doc = fs.readFileSync("D:/HotelManagement/json/data.json");
    const detailObj = JSON.parse(doc);
    detailObj.forEach((element) => {
      if (element.key == key) {
        element.orders.push(orders);
      }
    });
    const str = JSON.stringify(detailObj);
    fs.writeFileSync("D:/HotelManagement/json/data.json", str);
  };
}

module.exports = Util;
