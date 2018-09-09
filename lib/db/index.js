const config = require('config');
const Sequelize = require('sequelize');
const fs = require('fs');

const sequelize = new Sequelize(config.get('db.database'), config.get('db.username'), config.get('db.password'), {
  host: config.get('db.host'),
  dialect: 'mysql'
});

const db = {};

// load every .orm.js file in this directory
fs.readdir(__dirname, (err, files) => {
  if (err) throw err;

  let models = files.filter(file => {
    return file.indexOf('.orm.js') !== -1
  })

  for (let modelFile of models) {
    let model = sequelize.import('./' + modelFile)
    db[model.name] = model
  }

  // wire up model associations (relationships)
  Object.keys(db).forEach(function(modelName) {
    if ('associate' in db[modelName]) {
      db[modelName].associate(db)
    }
  })
})

// cache the connection and main Sequelize object
// and return along with models
db.sequelize = sequelize
db.Sequelize = Sequelize

// export connection
module.exports = db