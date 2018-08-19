const restifyErrors = require('restify-errors');
const Game = require('../../models/Game');
const Room = require('../../models/Room');
const Move = require('../../models/Move');

module.exports = (req, res, next) => {
  let dbGame = null;
  return Game.getFullDBGame(req.params.gameId)
  .then(dbGameTemp => {
    if (!dbGameTemp) {
      throw new restifyErrors.NotFoundError();
    }

    dbGame = dbGameTemp;

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
    });

    return next();
  })
  .catch((err) => {
    console.error(err);
    return next(new restifyErrors.InternalServerError(err));
  });
};
