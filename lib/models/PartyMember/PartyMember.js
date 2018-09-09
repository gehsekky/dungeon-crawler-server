const config = require('config');
const db = require('../../db');
const Attribute = require('../Game/Attribute');
const PartyMemberAttribute = require('./PartyMemberAttribute');
const ModelCache = require('../../util/ModelCache');
const ItemType = require('../Item/ItemType');
const Item = require('../Item/Item');
const PartyMemberItem = require('./PartyMemberItem');
const names = config.get('game.party.memberNamesPool');

class PartyMember {
  static load(dbPartyMember) {
    const partyMember = new PartyMember();
    partyMember.partyMemberId = dbPartyMember.partyMemberId;
    partyMember.gameId = dbPartyMember.gameId;
    partyMember.name = dbPartyMember.name;
    partyMember.attributes = dbPartyMember.PartyMemberAttributes.map(
      dbPartyMemberAttribute => PartyMemberAttribute.load(dbPartyMemberAttribute)
    );
    partyMember.inventory = dbPartyMember.PartyMemberItems.map(
      dbPartyMemberItem => PartyMemberItem.load(dbPartyMemberItem)
    );

    return partyMember;
  }

  constructor() {
    this.partyMemberId = null;
    this.gameId = null;
    this.name = names[Math.floor(Math.random() * names.length)];
    this.attributes = [];
    this.inventory = [];
  }

  init() {
    return this.initAttributes()
    .then(() => {
      return this.initInventory();
    })
    .catch((err) => {
      console.error(err);
      throw err;
    })
  }

  initInventory() {
    const inv = [];
    return ModelCache.ItemTypes()
    // add starting weapon
    .then((itemTypes) => {
      return db.Item.findOne({
        where: {
          itemTypeId: itemTypes.find(itemType => itemType.name === ItemType.ITEM_TYPE_WEAPON).itemTypeId,
          name: Item.STARTING_ITEM_WEAPON,
        }
      })
    })
    .then((simpleSword) => {
      const partyMemberItem = new PartyMemberItem();
      partyMemberItem.itemId = simpleSword.itemId;
      partyMemberItem.quantity = 1;
      inv.push(partyMemberItem);

      this.inventory = inv;
      return inv;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
  }

  initAttributes() {
    return ModelCache.Attributes()
    .then((attributes) => {
      return PartyMember.baseAttributes.map((baseAttribute) => {
        const attribute = attributes.find(attr => attr.name === baseAttribute);
        let partyMemberAttribute = null;
        switch (baseAttribute) {
          case Attribute.NAME_HEALTH:
          case Attribute.NAME_MANA:
            partyMemberAttribute = new PartyMemberAttribute();
            partyMemberAttribute.attributeId = attribute.attributeId;
            partyMemberAttribute.value = 100;
            return partyMemberAttribute;
          case Attribute.NAME_WEIGHT:
            partyMemberAttribute = new PartyMemberAttribute();
            partyMemberAttribute.attributeId = attribute.attributeId;
            partyMemberAttribute.value = 170;
            return partyMemberAttribute;
          case Attribute.NAME_STRENGTH:
          case Attribute.NAME_INTELLIGENCE:
          case Attribute.NAME_ENDURANCE:
            partyMemberAttribute = new PartyMemberAttribute();
            partyMemberAttribute.attributeId = attribute.attributeId;
            partyMemberAttribute.value = 5;
            return partyMemberAttribute;
          case Attribute.NAME_DEFENSE:
            partyMemberAttribute = new PartyMemberAttribute();
            partyMemberAttribute.attributeId = attribute.attributeId;
            partyMemberAttribute.value = 0;
            return partyMemberAttribute;
          default:
            throw new Error(`unrecognized attribute: ${baseAttribute}`);
        }
      });
    })
    .then((attributes) => {
      this.attributes = attributes;
      return attributes;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
  }

  save(t) {
    if (!this.partyMemberId) {
      let partyMember = null;
      return db.PartyMember.create({
        gameId: this.gameId,
        name: this.name,
        createdAt: db.sequelize.fn('NOW'),
        updatedAt: db.sequelize.fn('NOW'),
      }, { transaction: t })
      .then((dbResult) => {
        if (!dbResult) {
          throw new Error('could not save party member', this.name);
        }

        partyMember = dbResult;

        return Promise.all(this.attributes.map((partyMemberAttribute) => {
          partyMemberAttribute.partyMemberId = partyMember.partyMemberId;
          return partyMemberAttribute.save(t);
        }));
      })
      .then(() => {
        return Promise.all(this.inventory.map((partyMemberItem) => {
          partyMemberItem.partyMemberId = partyMember.partyMemberId;
          return partyMemberItem.save(t);
        }));
      })
      .catch((err) => {
        console.error(err);
        throw err;
      })
    }

    return Promise.resolve();
  }
}

PartyMember.baseAttributes = [
  Attribute.NAME_HEALTH,
  Attribute.NAME_MANA,
  Attribute.NAME_WEIGHT,
  Attribute.NAME_STRENGTH,
  Attribute.NAME_INTELLIGENCE,
  Attribute.NAME_ENDURANCE,
  Attribute.NAME_DEFENSE
];

module.exports = PartyMember;
