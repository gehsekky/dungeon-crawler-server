module.exports = (sequelize, DataTypes) => {
  const EnemyAttribute = sequelize.define('EnemyAttribute', {
    enemyId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'enemy_id'
    },
    attributeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'attribute_id'
    },
    value: { type: DataTypes.INTEGER, allowNull: false, field: 'value' },
    createdAt: { type: DataTypes.DATE, allowNull: false, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, allowNull: false, field: 'updated_at' }
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'enemy_attribute'
  });

  EnemyAttribute.associate = function (models) {
    EnemyAttribute.belongsTo(models.Enemy, {
      foreignKey: 'enemyId'
    });

    EnemyAttribute.belongsTo(models.Attribute, {
      foreignKey: 'attributeId'
    });
  };

  return EnemyAttribute;
}
