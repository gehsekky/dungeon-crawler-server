const restifyErrors = require('restify-errors');
const Move = require('../../models/Move');

module.exports = (req, res, next) => {
  let newRoom = null;
  let move = null;
  const gameId = parseInt(req.body.gameId);
  const turn = parseInt(req.body.turn);

  // create move
  return Move.getOrCreateNextRoom(gameId, turn, req.body.action)
  .then((result) => {
    move = new Move(gameId, null, result.room, req.body.action, turn + 1, null, result.isFirstVisit);
    return move.save();
  })
  .then(() => {
    res.json({ move });

    return next();
  })
  .catch((err) => {
    console.error(err);
    return next(new restifyErrors.InternalServerError(err));
  });
};
