class Inventory {
  constructor() {
    this.items = null;
    this.maxCapacity = null;
  }

  initialize() {
    this.items = [];
    this.maxCapacity = 50;
  }
}

module.exports = Inventory;