class ItemTypeAttribute {
  constructor() {
    this.itemTypeId = null;
    this.attributeId = null;
    this.defaultValue = null;
  }

  static load(dbItemTypeAttribute) {
    const itemTypeAttribute = new ItemTypeAttribute();
    itemTypeAttribute.itemTypeId = dbItemTypeAttribute.itemTypeId;
    itemTypeAttribute.attributeId = dbItemTypeAttribute.attributeId;
    itemTypeAttribute.defaultValue = dbItemTypeAttribute.defaultValue;

    return itemTypeAttribute;
  }
}

module.exports = ItemTypeAttribute;
