const restifyErrors = require('restify-errors');
const Game = require('../../models/Game/Game');
const Room = require('../../models/Game/Room');
const Move = require('../../models/Game/Move');
const ModelCache = require('../../util/ModelCache');

module.exports = (req, res, next) => {
  let dbGame = null;
  let cache = {};

  return ModelCache.Attributes()
  .then((attributes) => {
    cache.attributes = attributes;

    return ModelCache.RoomTypes();
  })
  .then((roomTypes) => {
    cache.roomTypes = roomTypes;

    return Game.getFullDBGame(req.params.gameId);
  })
  .then(response => {
    if (!response) {
      throw new restifyErrors.NotFoundError();
    }

    dbGame = response;

    return Game.load(dbGame);
  })
  .then((game) => {
    res.json({
      game,
      moves: dbGame.Moves.map((dbMove) => {
        const room = new Room(dbMove.Room.locationX, dbMove.Room.locationY, dbMove.Room.RoomType.name);
        room.roomId = dbMove.Room.roomId;
        room.gameId = dbMove.gameId;
        room.roomTypeId = dbMove.Room.roomTypeId;
        room.roomType = {
          name: dbMove.Room.RoomType.name,
          roomTypeId: dbMove.Room.RoomType.roomTypeId,
        };
        const move = new Move(dbMove.gameId, dbMove.roomId, room, dbMove.action, dbMove.turn, dbMove.storyBase, dbMove.isFirstVisit);
        move.moveId = dbMove.moveId;
        return move;
      }),
      cache,
    });

    return next();
  })
  .catch((err) => {
    console.error(err);
    return next(new restifyErrors.InternalServerError(err));
  });
};
