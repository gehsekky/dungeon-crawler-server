const db = require('../../db');

class PartyMemberAttribute {
  static load(dbPartyMemberAttribute) {
    const partyMemberAttribute = new PartyMemberAttribute();
    partyMemberAttribute.partyMemberId = dbPartyMemberAttribute.partyMemberId;
    partyMemberAttribute.attributeId = dbPartyMemberAttribute.attributeId;
    partyMemberAttribute.value = dbPartyMemberAttribute.value;
    partyMemberAttribute.attribute = dbPartyMemberAttribute.Attribute;

    return partyMemberAttribute;
  }

  constructor() {
    this.partyMemberId = null;
    this.attributeId = null;
    this.attribute = null;
    this.value = null;
  }

  save(t) {
    if (!this.partyMemberAttributeId) {
      return db.PartyMemberAttribute.create(Object.assign({}, {
        partyMemberId: this.partyMemberId,
        attributeId: this.attributeId,
        value: this.value,
      }, {
        createdAt: db.sequelize.fn('NOW'),
        updatedAt: db.sequelize.fn('NOW'),
      }), { transaction: t });
    }

    return Promise.resolve();
  }
}

module.exports = PartyMemberAttribute;
