class ItemAttribute {
  constructor() {
    this.itemId = null;
    this.attributeId = null;
    this.value = null;
  }

  static load(dbItemAttribute) {
    const itemAttribute = new ItemAttribute();
    itemAttribute.itemId = dbItemAttribute.itemId;
    itemAttribute.attributeId = dbItemAttribute.attributeId;
    itemAttribute.value = dbItemAttribute.value;

    return itemAttribute;
  }
}

module.exports = ItemAttribute;
