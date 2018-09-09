const db = require('../db');
const Attribute = require('../models/Game/Attribute');
const RoomType = require('../models/Game/RoomType');
const ItemType = require('../models/Item/ItemType');

function ModelCache() {
  this._attributes = null;
  this.Attributes = () => {
    if (this._attributes) return Promise.resolve(this._attributes);

    return db.Attribute.findAll()
    .then((attributes) => {
      this._attributes = attributes.map(attribute => Attribute.load(attribute));
      return this._attributes;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    })
  };

  this._roomTypes = null;
  this.RoomTypes = () => {
    if (this._roomTypes) return Promise.resolve(this._roomTypes);

    return db.RoomType.findAll()
    .then((roomTypes) => {
      this._roomTypes = roomTypes.map(roomType => RoomType.load(roomType));
      return this._roomTypes;
    })
  };

  this._itemTypes = null;
  this.ItemTypes = () => {
    if  (this._itemTypes) return Promise.resolve(this._itemTypes);

    return db.ItemType.findAll()
    .then((itemTypes) => {
      this._itemTypes = itemTypes.map(itemType => ItemType.load(itemType));
      return this._itemTypes;
    })
  }
}

ModelCache.instance = null;

ModelCache.getInstance = function () {
  if (!this.instance) this.instance = new ModelCache();

  return this.instance;
}

module.exports = ModelCache.getInstance();