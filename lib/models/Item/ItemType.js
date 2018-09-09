class ItemType {
  constructor() {
    this.itemTypeId = null;
    this.name = null;
    this.attributes = null;
  }

  static load(dbItemType) {
    const itemType = new ItemType();
    itemType.itemTypeId = dbItemType.itemTypeId;
    itemType.name = dbItemType.name;
    itemType.attributes = dbItemType.Attributes;
    return itemType;
  }
}

ItemType.ITEM_TYPE_WEAPON = 'weapon';
ItemType.ITEM_TYPE_ARMOR = 'armor';
ItemType.ITEM_TYPE_CONSUMABLE = 'consumable';

module.exports = ItemType;
