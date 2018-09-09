const Attribute = require('../Game/Attribute');

class ItemAttribute {
  constructor() {
    this.itemId = null;
    this.attributeId = null;
    this.value = null;
    this.attribute = null;
  }

  static load(dbItemAttribute) {
    console.log('dbItemAttribute.Attribute', dbItemAttribute.Attribute);
    const itemAttribute = new ItemAttribute();
    itemAttribute.itemId = dbItemAttribute.itemId;
    itemAttribute.attributeId = dbItemAttribute.attributeId;
    itemAttribute.value = dbItemAttribute.value;
    itemAttribute.attribute = Attribute.load(dbItemAttribute.Attribute);
    return itemAttribute;
  }
}

module.exports = ItemAttribute;
