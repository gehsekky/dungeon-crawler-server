const db = require('../../db');
const Item = require('../Item/Item');

class PartyMemberItem {
  static load(dbPartyMemberItem) {
    const partyMemberItem = new PartyMemberItem();
    partyMemberItem.partyMemberId = dbPartyMemberItem.partyMemberId;
    partyMemberItem.itemId = dbPartyMemberItem.itemId;
    partyMemberItem.quantity = dbPartyMemberItem.quantity;
    partyMemberItem.item = Item.load(dbPartyMemberItem.Item);

    return partyMemberItem;
  }

  constructor() {
    this.partyMemberId = null;
    this.itemId = null;
    this.quantity = null;
    this.item = null;
  }

  save(t) {
    return db.PartyMemberItem.create({
      partyMemberId: this.partyMemberId,
      itemId: this.itemId,
      quantity: this.quantity,
      createdAt: db.sequelize.fn('NOW'),
      updatedAt: db.sequelize.fn('NOW'),
    }, { transaction: t })
    .catch((err) => {
      console.error(err);
      throw err;
    })
  }
}

module.exports = PartyMemberItem;
