const Game = require('./game.orm.js');

module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    roomId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'room_id',
    },
    gameId: { type: DataTypes.INTEGER, allowNull: false, field: 'game_id' },
    locationX: { type: DataTypes.INTEGER, allowNull: false, field: 'location_x' },
    locationY: { type: DataTypes.INTEGER, allowNull: false, field: 'location_y' },
    roomTypeId: { type: DataTypes.INTEGER, allowNull: false, field: 'room_type_id' },
    createdAt: { type: DataTypes.DATE, allowNull: false, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, allowNull: false, field: 'updated_at' },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'room',
  });

  Room.associate = function (models) {
    Room.belongsTo(models.Game, {
      foreignKey: 'gameId',
    });

    Room.belongsTo(models.RoomType, {
      foreignKey: 'roomTypeId',
    });

    Room.hasMany(models.Move, {
      foreignKey: 'roomId',
    });
  };

  return Room;
}
