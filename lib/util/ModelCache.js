const db = require('../db');
const Attribute = require('../models/Attribute');

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

  };
}

ModelCache.instance = null;

ModelCache.getInstance = function () {
  if (!this.instance) this.instance = new ModelCache();

  return Promise.resolve(this.instance);
}

module.exports = ModelCache.getInstance();