const db = require('../db');

class PartyMemberAttribute {
  static load(dbPartyMemberAttribute) {
    const partyMemberAttribute = new PartyMemberAttribute();
    partyMemberAttribute.partyMemberId = dbPartyMemberAttribute.partyMemberId;
    partyMemberAttribute.attributeId = dbPartyMemberAttribute.attributeId;
    partyMemberAttribute.numberValue = dbPartyMemberAttribute.numberValue;
    partyMemberAttribute.textValue = dbPartyMemberAttribute.textValue;

    return partyMemberAttribute;
  }

  constructor() {
    this.partyMemberId = null;
    this.attributeId = null;
    this.numberValue = null;
    this.textValue = null;
  }

  save(t) {
    if (!this.partyMemberAttributeId) {
      return db.PartyMemberAttribute.create(Object.assign({}, this, {
        createdAt: db.sequelize.fn('NOW'),
        updatedAt: db.sequelize.fn('NOW'),
      }), { transaction: t });
    }

    return Promise.resolve();
  }
}

module.exports = PartyMemberAttribute;