class Attribute {
  constructor() {
    this.attributeId = null;
    this.name = null;
    this.description = null;
  }

  static load(dbAttribute) {
    const attribute = new Attribute();
    attribute.attributeId = dbAttribute.attributeId;
    attribute.name = dbAttribute.name;
    attribute.description = dbAttribute.description;

    return attribute;
  }
}

Attribute.NAME_HEALTH = 'health';
Attribute.NAME_MANA = 'mana';
Attribute.NAME_WEIGHT = 'weight';
Attribute.NAME_STRENGTH = 'strength';
Attribute.NAME_INTELLIGENCE = 'intelligence';
Attribute.NAME_ENDURANCE = 'endurance';
Attribute.NAME_DEFENSE = 'defense';

module.exports = Attribute;