const ItemAttribute = require('./ItemAttribute');
const ItemType = require('./ItemType');

class Item {
  constructor() {
    this.itemId = null;
    this.name = null;
    this.itemTypeId = null;
    this.itemType = null;
    this.attributes = null;
  }

  static load(dbItem) {
    const item = new Item();
    item.itemId = dbItem.itemId;
    item.name = dbItem.name;
    item.itemTypeId = dbItem.itemTypeId;
    item.itemType = ItemType.load(dbItem.ItemType);
    item.attributes = dbItem.ItemAttributes.map(dbAttr => ItemAttribute.load(dbAttr));

    return item;
  }
}

Item.STARTING_ITEM_WEAPON = 'simple sword';

module.exports = Item;