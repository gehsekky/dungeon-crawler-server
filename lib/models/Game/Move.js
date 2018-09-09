const Room = require('./Room');
const InputType = require('./InputType');
const db = require('../../db');

class Move {
  constructor(gameId, roomId, room, action, turn, storyBase, isFirstVisit) {
    this.moveId = null;
    this.gameId = null;
    this.roomId = null;
    this.room = null;
    this.action = null;
    this.storyBase = null;
    this.turn = null;
    this.isFirstVisit = null;

    this.initialize(gameId, roomId, room, action, turn, storyBase, isFirstVisit);
  }

  initialize(gameId, roomId, room, action, turn, storyBase, isFirstVisit) {
    this.gameId = gameId;
    this.roomId = parseInt(roomId || room.roomId);
    this.room = room;
    this.action = action;
    this.turn = turn;
    this.isFirstVisit = isFirstVisit;
    this.storyBase = storyBase ? storyBase : this.autoStoryBase(room.type);
  }

  static getOrCreateNextRoom(gameId, turn, action) {
    const availableRoomTypes = ['filler'];
    let postActionX = null;
    let postActionY = null;
    let randomRoomType = null;
    let roomDAO = null;

    return db.sequelize.transaction((t) => {
      const result = {
        room: null,
        isFirstVisit: null,
      };

      return db.Move.findOne({
        where: {
          gameId,
          turn,
        },
        include: [{
          model: db.Room,
        }]
      }, { transaction: t })
      .then((move) => {
        postActionX = move.Room.locationX;
        postActionY = move.Room.locationY;

        switch (action) {
          case InputType.INPUT_TYPE_NORTH:
            postActionY++;
            break;
          case InputType.INPUT_TYPE_SOUTH:
            postActionY--;
            break;
          case InputType.INPUT_TYPE_EAST:
            postActionX++;
            break;
          case InputType.INPUT_TYPE_WEST:
            postActionX--;
            break;
          default:
            throw new Error(`unsupported action: ${action}`);
        }

        return db.RoomType.findOne({
          where: {
            name: availableRoomTypes[Math.floor(Math.random() * availableRoomTypes.length)],
          }
        }, { transaction: t });
      })
      .then((roomType) => {
        randomRoomType = roomType;

        // check if room exists
        return db.Room.findOne({
          where: {
            gameId,
            locationX: postActionX,
            locationY: postActionY,
          },
          include: [{
            model: db.RoomType
          }]
        }, { transaction: t });
      })
      .then((room) => {
        if (!room) {
          // create room
          return db.Room.create({
            gameId,
            locationX: postActionX,
            locationY: postActionY,
            createdAt: db.sequelize.fn('NOW'),
            updatedAt: db.sequelize.fn('NOW'),
            roomTypeId: randomRoomType.roomTypeId,
          }, { transaction: t })
          .then((newRoom) => {
            if (!newRoom) {
              throw new Error('could not create new room');
            }

            roomDAO = new Room(newRoom.locationX, newRoom.locationY, randomRoomType.name);
            roomDAO.roomId = newRoom.roomId;
            roomDAO.gameId = gameId;
            result.room = roomDAO;
            result.isFirstVisit = true;
            return result;
          })
        }

        roomDAO = new Room(room.locationX, room.locationY, room.RoomType.name);
        roomDAO.roomId = room.roomId;
        roomDAO.gameId = gameId;
        result.room = roomDAO;
        result.isFirstVisit = false;
        return result;
      })
    });
  }

  autoStoryBase(roomType) {
    let roomResource = null;
    try {
      roomResource = require(`../../../resource/rooms/${roomType}.json`);
    } catch (err) {
      console.error(`problem loading story base file: ${roomType}`, err);
      throw err;
    }

    const source = this.isFirstVisit ? roomResource.text : roomResource.visited;
    return source[Math.floor(Math.random() * source.length)];
  }

  save(t) {
    if (!this.moveId) {
      return db.Move.create({
        gameId: this.gameId,
        roomId: this.roomId,
        action: this.action,
        storyBase: this.storyBase,
        turn: this.turn,
        isFirstVisit: this.isFirstVisit,
        createdAt: db.sequelize.fn('NOW'),
        updatedAt: db.sequelize.fn('NOW'),
      }, { transaction: t })
      .then((move) => {
        this.moveId = move.moveId;

        return move;
      })
    }

    return Promise.resolve();
  }
}

module.exports = Move;
