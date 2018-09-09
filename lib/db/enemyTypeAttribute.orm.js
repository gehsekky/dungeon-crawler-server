module.exports = (sequelize, DataTypes) => {
  const EnemyTypeAttribute = sequelize.define('EnemyTypeAttribute', {
    enemyTypeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'enemy_type_id'
    },
    attributeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'attribute_id'
    },
    defaultValue: { type: DataTypes.INTEGER, allowNull: false, field: 'default_value' },
    createdAt: { type: DataTypes.DATE, allowNull: false, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, allowNull: false, field: 'updated_at' }
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'enemy_type_attribute'
  });

  EnemyTypeAttribute.associate = function (models) {
    EnemyTypeAttribute.belongsTo(models.EnemyType, {
      foreignKey: 'enemyTypeId'
    });

    EnemyTypeAttribute.belongsTo(models.Attribute, {
      foreignKey: 'attributeId'
    });
  };

  return EnemyTypeAttribute;
}
