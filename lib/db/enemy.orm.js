module.exports = (sequelize, DataTypes) => {
  const Enemy = sequelize.define('Enemy', {
    enemyId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'enemy_id'
    },
    enemyTypeId: { type: DataTypes.INTEGER, allowNull: false, field: 'enemy_type_id' },
    name: { type: DataTypes.STRING(2048), allowNull: false, field: 'name' },
    createdAt: { type: DataTypes.DATE, allowNull: false, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, allowNull: false, field: 'updated_at' }
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'enemy'
  });

  Enemy.associate = function (models) {
    Enemy.belongsTo(models.EnemyType, {
      foreignKey: 'enemyTypeId'
    });
  };

  return Enemy;
}
