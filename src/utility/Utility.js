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
  registerUser = () => {
    let customer = new Customer();
    console.log("");
    customer.fName = prompt("Enter first name : ");
    customer.lName = prompt("Enter last name : ");
    customer.gender = prompt("Enter gender : ");
    customer.mNumber = prompt("Enter mobile number : ");
    customer.durationOfStay = prompt("Enter duration of stay (in days) : ");
    customer.key = this.generateKey(customer.fName, customer.mNumber);
    customer.orders = [];
    customer.date = new Date(); 
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
    const doc = fs.readFileSync("D:/Custom_Assignments/HotelManagement/json/data.json");
    if (doc.length == 0) {
      const customerStr = JSON.stringify(customer);
      fs.writeFileSync("D:/Custom_Assignments/HotelManagement/json/data.json", customerStr);
    } else {
      let detailObj = JSON.parse(doc);
      // detailObj.push(customer);
      detailObj.orders += customer;
      const str = JSON.stringify(detailObj);
      fs.writeFileSync("D:/Custom_Assignments/HotelManagement/json/data.json", str);
    }
  };

  //Generate unique key for customer
  generateKey = (name, number) => {
    return name.substring(0, 4) + number.substring(0, 4);
  };

  login() {
    console.log("\n( Your key is first 2 char of your name and mobile number)");
    let name = prompt("Enter your username : ");
    let key = prompt("Enter key : ");
    const doc = fs.readFileSync("D:/Custom_Assignments/HotelManagement/json/data.json");
    const detailObj = JSON.parse(doc);
    for (let user in detailObj) {
      if ((detailObj[user].firstName === name && detailObj[user].key) === key) {
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
    let option = 0;
    do {
      console.log("\nPress 1 - Order Coffee ");
      console.log("Press 2 - Order Breakfast ");
      console.log("Press 3 - Order Lunch ");
      console.log("Press 4 - Order Dinner ");
      console.log("Press 5 - Back\n");
      option = parseInt(prompt("Enter your choice : "));

      const writeOrder = (item) => {
        const doc = fs.readFileSync("D:/Custom_Assignments/HotelManagement/json/data.json");
        const detailObj = JSON.parse(doc);
        detailObj.orders = item;
        console.log(detailObj.orders);
        // detailObj.push(coffee);
        console.log(detailObj);
        const str = JSON.stringify(detailObj);
        // let confirm = prompt("Enter key to confirm order : ");
        // if(confirm == detailObj.uniqueKey) {
        fs.writeFileSync("D:/Custom_Assignments/HotelManagement/json/data.json", str);
        // }
      };

      switch (option) {
        case 1:
          const coffee = new Orders("Coffee", 1, 20, 20);

          writeOrder(coffee);
          console.log("\nItem added in cart.");
          break;

        case 2:
          const breakfast = new Orders("Breakfast", 1, 100, 100);

          writeOrder(breakfast);
          console.log("\nItem added in cart.");
          break;

        case 3:
          const lunch = new Orders("Lunch", 1, 200, 200);

          writeOrder(lunch);
          console.log("\nItem added in cart.");
          break;

        case 4:
          const dinner = new Orders("Dinner", 1, 300, 300);

          writeOrder(dinner);
          console.log("\nItem added in cart.");
          break;

        default:
          console.log();
          break;
      }
    } while (option != 5);
  };

  orderServices = (loginObject) => {
    let serviceArray = new Array();
    let option = 0;
    do {
      console.log("\nPress 1 - Laundry (200rs)");
      console.log("Press 2 - Tour (500rs)");
      console.log("Press 3 - Rent car (3500rs)");
      console.log("Press 4 - Back\n");
      let orderFoodArray = new Array();
      option = parseInt(prompt("Enter your choice : "));

      const writeOrder = (item) => {
        const doc = fs.readFileSync("D:/Custom_Assignments/HotelManagement/json/data.json");
        const detailObj = JSON.parse(doc);
        detailObj.orders = item;
        console.log(detailObj.orders);
        // detailObj.push(coffee);
        console.log(detailObj);
        const str = JSON.stringify(detailObj);
        // let confirm = prompt("Enter key to confirm order : ");
        // if(confirm == detailObj.uniqueKey) {
        fs.writeFileSync("D:/Custom_Assignments/HotelManagement/json/data.json", str);
        // }
      };

      switch (option) {
        case 1:
          const laundry = new Orders("Laundry", 1, 200, 200);
          writeOrder(laundry);
          console.log("\nItem added in cart.");
          break;
        case 2:
          const tour = new Orders("Tour", 1, 500, 500);
          writeOrder(tour);
          console.log("\nItem added in cart.");
          break;
        case 3:
          const bike = new Orders("Bike", 1, 1000, 1000);
          writeOrder(bike);
          console.log("\nItem added in cart.");
          break;

        default:
          console.log();
          break;
      }
    } while (option != 4);
  };

  generateBill = () => {
    const doc = fs.readFileSync("D:/Custom_Assignments/HotelManagement/json/data.json");
    const detailObj = JSON.parse(doc);
    console.log(detailObj);
    let bill = detailObj.orders.totalAmount;
    return bill;
    // for (const [key, value] of Object.entries(detailObj.orders)) {
    //   bill += detailObj.orders.amount;

    // detailObj.forEach(element =>bill + console.log(detailObj.orders.amount));
    // console.log(bill);
 
    // const first = detailObj.forEach(element => {
    //   console.log(element);
    // });
    // first();
  };

  adminLogin = () => {
    console.log("\nPress 1 - CheckOut");
    console.log("Press 2 - View Customers");
    console.log("Press 3 - To leave\n");
    let option = parseInt(prompt("Enter your choice : "));
    if (option == 1) {
      this.checkOut();
    } else if (option == 2) {
      const doc = fs.readFileSync("D:/Custom_Assignments/HotelManagement/json/data.json");
      const detailObj = JSON.parse(doc);
      console.log(detailObj);
    } else this.login();
  };

  orderFinal = (key, orders) => {
    const doc = fs.readFileSync("D:/Custom_Assignments/HotelManagement/json/data.json");
    const detailObj = JSON.parse(doc);
    detailObj.forEach((element) => {
      if (element.key == key) {
        element.orders.push(orders);
      }
    });
    const str = JSON.stringify(detailObj);
    fs.writeFileSync("D:/Custom_Assignments/HotelManagement/json/data.json", str);
  };

  checkOut = () => {
    const doc = fs.readFileSync("D:/Custom_Assignments/HotelManagement/json/data.json");
    let detailObj = JSON.parse(doc);

    const orderBill = this.generateBill();
    const date = new Date;

    console.log('checkout date' + date );

    const totalBill = orderBill + (detailObj.durationOfStay * 1000);
    console.log("Your total bill is : " + totalBill);
  }
}

module.exports = Util;

//checkoutdate,bill-extract,unit test