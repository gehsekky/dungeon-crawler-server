const restifyErrors = require('restify-errors');
const Game = require('../../models/Game/Game');

module.exports = (req, res, next) => {
  // create game
  const game = new Game();

  return game.initialize()
  .then(() => {
    return game.save();
  })
  .then(() => {
    res.json({ gameId: game.gameId });

    return next();
  })
  .catch((err) => {
    console.error(err);
    return next(new restifyErrors.InternalServerError(err));
  });
};
