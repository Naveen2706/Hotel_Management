class Orders {
  item;
  quantity;
  price;
  totalAmount;

  constructor(item, quantity, price, totalAmount) {
    this.item = item;
    this.quantity = quantity;
    this.price = price;
    this.totalAmount = totalAmount;
  }
}

module.exports = Orders;