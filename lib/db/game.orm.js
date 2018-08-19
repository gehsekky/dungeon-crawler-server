module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    gameId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'game_id'
    },
    createdAt: { type: DataTypes.DATE, allowNull: false, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, allowNull: false, field: 'updated_at' }
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'game'
  });

  Game.associate = function (models) {
    Game.hasMany(models.Room, {
      foreignKey: 'gameId'
    });

    Game.hasMany(models.PartyMember, {
      foreignKey: 'gameId'
    });

    Game.hasMany(models.Move, {
      foreignKey: 'gameId'
    })
  };

  return Game;
}
