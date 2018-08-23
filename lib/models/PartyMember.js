const config = require('config');
const db = require('../db');
const Attribute = require('./Attribute');
const PartyMemberAttribute = require('./PartyMemberAttribute');
const ModelCache = require('../util/ModelCache');

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

    return partyMember;
  }

  constructor() {
    this.partyMemberId = null;
    this.gameId = null;
    this.name = names[Math.floor(Math.random() * names.length)];
    this.attributes = [];
  }

  initAttributes() {
    return ModelCache.Attributes()
    .then(() => {
      return Promise.all(PartyMember.baseAttributes.map((baseAttribute) => {
        switch (baseAttribute) {
          case Attribute.NAME_HEALTH:
          case Attribute.NAME_MANA:
            return this.getAttributeFromCache(baseAttribute)
            .then((attribute) => {
              const partyMemberAttribute = new PartyMemberAttribute();
              partyMemberAttribute.attributeId = attribute.attributeId;
              partyMemberAttribute.value = 100;
              return partyMemberAttribute;
            });
          case Attribute.NAME_WEIGHT:
            return this.getAttributeFromCache(baseAttribute)
            .then((attribute) => {
              const partyMemberAttribute = new PartyMemberAttribute();
              partyMemberAttribute.attributeId = attribute.attributeId;
              partyMemberAttribute.value = 170;
              return partyMemberAttribute;
            });
          case Attribute.NAME_STRENGTH:
          case Attribute.NAME_INTELLIGENCE:
          case Attribute.NAME_ENDURANCE:
            return this.getAttributeFromCache(baseAttribute)
            .then((attribute) => {
              const partyMemberAttribute = new PartyMemberAttribute();
              partyMemberAttribute.attributeId = attribute.attributeId;
              partyMemberAttribute.value = 5;
              return partyMemberAttribute;
            });
          case Attribute.NAME_DEFENSE:
            return this.getAttributeFromCache(baseAttribute)
            .then((attribute) => {
              const partyMemberAttribute = new PartyMemberAttribute();
              partyMemberAttribute.attributeId = attribute.attributeId;
              partyMemberAttribute.value = 0;
              return partyMemberAttribute;
            });
          default:
            throw new Error(`unrecognized attribute: ${baseAttribute}`);
        }
      }));
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

  getAttributeFromCache(name) {
    return ModelCache
    .then(modelCache => modelCache.Attributes())
    .then(attributes => {
      return attributes.find(attr => attr.name === name);
    })
    .catch((err) => {
      console.error(err);
      throw err;
    })
  }

  save(t) {
    if (!this.partyMemberId) {
      return db.PartyMember.create({
        gameId: this.gameId,
        name: this.name,
        createdAt: db.sequelize.fn('NOW'),
        updatedAt: db.sequelize.fn('NOW'),
      }, { transaction: t })
      .then((partyMember) => {
        if (!partyMember) {
          throw new Error('could not save party member', this.name);
        }

        console.log('begin saving attributes');

        return Promise.all(this.attributes.map((partyMemberAttribute) => {
          partyMemberAttribute.partyMemberId = partyMember.partyMemberId;
          return partyMemberAttribute.save(t);
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
