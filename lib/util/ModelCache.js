const db = require('../db');
const Attribute = require('../models/Attribute');
const RoomType = require('../models/RoomType');

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
}

ModelCache.instance = null;

ModelCache.getInstance = function () {
  if (!this.instance) this.instance = new ModelCache();

  return this.instance;
}

module.exports = ModelCache.getInstance();