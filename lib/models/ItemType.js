class ItemType {
  constructor() {
    this.itemTypeId = null;
    this.name = null;
    this.attributes = null;
  }
}

ItemType.ITEM_TYPE_WEAPON = 'weapon';
ItemType.ITEM_TYPE_ARMOR = 'armor';
ItemType.ITEM_TYPE_CONSUMABLE = 'consumable';

module.exports = ItemType;
