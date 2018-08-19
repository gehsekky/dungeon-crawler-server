module.exports = (sequelize, DataTypes) => {
  const Move = sequelize.define('Move', {
    moveId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'move_id'
    },
    gameId: { type: DataTypes.INTEGER, allowNull: false, field: 'game_id' },
    roomId: { type: DataTypes.INTEGER, allowNull: false, field: 'room_id' },
    action: { type: DataTypes.STRING, allowNull: false, field: 'action' },
    storyBase: { type: DataTypes.STRING, allowNull: false, field: 'story_base' },
    turn: { type: DataTypes.INTEGER, allowNull: false, field: 'turn' },
    isFirstVisit: { type: DataTypes.BOOLEAN, allowNull: false, field: 'is_first_visit' },
    createdAt: { type: DataTypes.DATE, allowNull: false, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, allowNull: false, field: 'updated_at' }
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'move'
  });

  Move.associate = function (models) {
    Move.belongsTo(models.Game, {
      foreignKey: 'gameId'
    });

    Move.belongsTo(models.Room, {
      foreignKey: 'roomId'
    });
  };

  return Move;
}
