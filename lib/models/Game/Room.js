const Coordinate = require('./Coordinate');
const RoomType = require('./RoomType');
const db = require('../../db');

/**
 * a graph node for a map
 */
class Room {
  /**
   * coordinate constructor
   * @param {number} x represents distance on the x-axis
   * @param {number} y represents distance on the y-axis
   */
  constructor(x, y, type) {
    this.roomId = null;
    this.gameId = null;
    this.roomTypeId = null;
    this.roomType = null;
    this.location = new Coordinate(x, y);
    if (!type) {
      throw new Error('must provide valid room type');
    }
    this.type = type;
  }

  save(t) {
    if (!this.roomId) {
      return db.Room.create({
        gameId: this.gameId,
        locationX: this.location.x,
        locationY: this.location.y,
        roomTypeId: this.roomTypeId,
        createdAt: db.sequelize.fn('NOW'),
        updatedAt: db.sequelize.fn('NOW'),
      }, { transaction: t })
      .then((room) => {
        this.roomId = room.roomId;

        return room;
      });
    }

    return Promise.resolve();
  }

  static load(dbRoom) {
    const room = new Room(dbRoom.locationX, dbRoom.locationY, dbRoom.RoomType.name);
    room.roomId = dbRoom.roomId;
    room.gameId = dbRoom.gameId;
    room.roomTypeId = dbRoom.roomTypeId;
    room.roomType = RoomType.load(dbRoom.RoomType);

    return room;
  }
}

module.exports = Room;
