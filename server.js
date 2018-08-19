const config = require('config');
const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');

const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ['http://localhost:8080'],
  allowHeaders: [],
  exposeHeaders: []
});

const server = restify.createServer({
  name: config.get('server.name')
});

server.pre(cors.preflight)
server.use(cors.actual)
server.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});

server.use(restify.plugins.bodyParser());

server.post('/game', require('./lib/endpoints/game/game-post'));

server.get('/game/:gameId', require('./lib/endpoints/game/game-get'));

server.post('/move', require('./lib/endpoints/move/move-post'))

server.listen(config.get('server.port'), () => {
  console.log(`${config.get('server.name')} listening on ${config.get('server.port')}`);
});
