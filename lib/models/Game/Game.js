const Room = require('./Room');
const RoomType = require('./RoomType');
const InputType = require('./InputType');
const PartyMember = require('../PartyMember/PartyMember');
const Move = require('./Move');
const db = require('../../db');

class Game {
  constructor() {
    this.gameId = null;
    this.room = new Room(0, 0, RoomType.ROOM_TYPE_START);
    this.turn = null;
    this.party = [];
    this.move = null;
  }

  initialize() {
    const partyMember = new PartyMember();
    return partyMember.init()
    .then(() => {
      this.party.push(partyMember);
    });
  }

  /**
   * initialize game vars and reset map
   */
  static load(dbGame) {
    const game = new Game();
    game.gameId = dbGame.gameId;

    const room = Room.load(dbGame.Rooms[0]);
    game.room = room;

    const currentMove = dbGame.Moves.sort((a, b) => {
      if (a.turn < b.turn) return 1;
      if (a.turn > b.turn) return -1;

      throw new Error('duplicate turn detected');
    })[0];
    game.turn = currentMove.turn;
    game.party = dbGame.PartyMembers.map((dbPartyMember) => PartyMember.load(dbPartyMember));
    return game;
  }

  static getFullDBGame(gameId) {
    return db.sequelize.transaction((t) => {
      return db.Move.max('turn', {
        where: {
          gameId,
        }
      }, { transaction: t })
      .then(currentTurn => db.Move.findOne({
        where: {
          gameId,
          turn: currentTurn,
        }
      }, { transaction: t }))
      .then(move => db.Game.findOne({
        where: {
          gameId,
        },
        include: [{
          model: db.Room,
          where: {
            roomId: move.roomId,
          },
          include: [{
            model: db.RoomType,
          }]
        }, {
          model: db.PartyMember,
          include: [{
            model: db.PartyMemberAttribute,
            include: [{
              model: db.Attribute,
            }]
          }, {
            model: db.PartyMemberItem,
            include: [{
              model: db.Item,
              include: [{
                model: db.ItemType,
              }, {
                model: db.ItemAttribute,
                include: [{
                  model: db.Attribute
                }]
              }]
            }]
          }]
        }, {
          model: db.Move,
          include: [{
            model: db.Room,
            include: [{
              model: db.RoomType,
            }]
          }]
        }],
      }, { transaction: t }));
    });
  }

  save() {
    if (!this.gameId) {
      let startingRoomType = null;
      let newGame = null;
      let startingRoom = null;

      return db.sequelize.transaction((t) => {
        return db.RoomType.findOne({
          name: RoomType.ROOM_TYPE_START,
        }, { transaction: t })
        .then((roomType) => {
          startingRoomType = roomType;

          return db.Game.create({
            createdAt: db.sequelize.fn('NOW'),
            updatedAt: db.sequelize.fn('NOW'),
          }, { transaction: t });
        })
        .then(game => {
          newGame = game;

          this.gameId = game.gameId;
          this.room.gameId = game.gameId;
          this.room.roomTypeId = startingRoomType.roomTypeId;
          this.party.forEach(partyMember => {
            partyMember.gameId = game.gameId;
          });

          return this.room.save(t);
        })
        .then((room) => {
          startingRoom = room;
          startingRoom.type = RoomType.ROOM_TYPE_START;

          return Promise.all(this.party.map(partyMember => partyMember.save(t)));
        })
        .then(() => {
          const move = new Move(newGame.gameId, null, startingRoom, InputType.INPUT_TYPE_START, 0, null, true);
          return move.save(t);
        })
        .catch((err) => {
          console.error(err);
          throw err;
        })
      })
    }

    return Promise.resolve();
  }
}

module.exports = Game;
