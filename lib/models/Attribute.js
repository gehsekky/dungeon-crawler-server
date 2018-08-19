class Attribute {
  constructor() {
    this.attributeId = null;
    this.name = null;
    this.description = null;
    this.valueType = null;
  }

  static load(dbAttribute) {
    const attribute = new Attribute();
    attribute.attributeId = dbAttribute.attributeId;
    attribute.name = dbAttribute.name;
    attribute.description = dbAttribute.description;
    attribute.valueType = dbAttribute.valueType;

    return attribute;
  }
}

Attribute.VALUE_TYPE_TEXT = 'text';
Attribute.VALUE_TYPE_NUMBER = 'number';

Attribute.NAME_HEALTH = 'health';
Attribute.NAME_MANA = 'mana';
Attribute.NAME_WEIGHT = 'weight';
Attribute.NAME_STRENGTH = 'strength';
Attribute.NAME_INTELLIGENCE = 'intelligence';
Attribute.NAME_ENDURANCE = 'endurance';
Attribute.NAME_DEFENSE = 'defense';

module.exports = Attribute;