const db = require('../db');

class PartyMemberItem {
  static load(dbPartyMemberItem) {
    const partyMemberItem = new PartyMemberItem();
    partyMemberItem.partyMemberId = dbPartyMemberItem.partyMemberId;
    partyMemberItem.itemId = dbPartyMemberItem.itemId;
    partyMemberItem.quantity = dbPartyMemberItem.quantity;

    return partyMemberItem;
  }

  constructor() {
    this.partyMemberId = null;
    this.itemId = null;
    this.quantity = null;
  }

  save(t) {
    if (!this.partyMemberItemId) {
      return db.PartyMemberItem.create(Object.assign({}, this, {
        createdAt: db.sequelize.fn('NOW'),
        updatedAt: db.sequelize.fn('NOW'),
      }), { transaction: t });
    }

    return Promise.resolve();
  }
}

module.exports = PartyMemberItem;
