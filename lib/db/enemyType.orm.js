module.exports = (sequelize, DataTypes) => {
  const EnemyType = sequelize.define('EnemyType', {
    enemyTypeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'enemy_type_id'
    },
    name: { type: DataTypes.STRING(2048), allowNull: false, field: 'name' },
    description: { type: DataTypes.STRING, allowNull: false, field: 'description' },
    createdAt: { type: DataTypes.DATE, allowNull: false, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, allowNull: false, field: 'updated_at' }
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'enemy_type'
  });

  EnemyType.associate = function (models) {
    EnemyType.hasMany(models.Enemy, {
      foreignKey: 'enemyTypeId'
    });
  };

  return EnemyType;
}
