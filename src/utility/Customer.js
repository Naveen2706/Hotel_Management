class Customer {
  firstName;
  lastName;
  gender;
  mobileNumber;
  durationOfStay;
  uniqueKey;
  orders;

  constructor(...params) {
    this.firstName = params[0];
    this.lastName = params[1];
    this.gender = params[2];
    this.mobileNumber = params[3];
    this.durationOfStay = params[4];
    this.uniqueKey = params[5];
    this.orders = params[6];
  }

  set fName(firstName) {
    let nameRegex = RegExp("^[A-Z]{1}[a-z]{3,}$");
    if (nameRegex.test(firstName)) {
      this.firstName = firstName;
    } else {
      throw "Invalid entry!";
    }
  }

  get fName() {
    return this.firstName;
  }

  set lName(lastName) {
    let nameRegex = RegExp("^[A-Z]{1}[a-z]{3,}$");
    if (nameRegex.test(lastName)) {
      this.lastName = lastName;
    } else {
      throw "Invalid entry!";
    }
  }

  get lName() {
    return this.lastName;
  }

  set customerGender(gender) {
    this.gender = gender;
  }

  set mNumber(mobileNumber) {
    let nameRegex = RegExp("^[7-9]{1}[0-9]{9}$");
    if (nameRegex.test(mobileNumber)) {
      this.mobileNumber = mobileNumber;
    } else {
      throw "Invalid entry!";
    }
  }

  get mNumber() {
    return this.mobileNumber;
  }

  set duration(durationOfStay) {
    this.durationOfStay = durationOfStay;
  }

  get duration() {
    return this.durationOfStay;
  }

  set unique(uniqueKey) {
    this.uniqueKey = uniqueKey;
  }

  get unique() {
    return this.uniqueKey;
  }
}

module.exports = Customer;
