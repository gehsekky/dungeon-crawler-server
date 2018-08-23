module.exports = (sequelize, DataTypes) => {
  const ItemAttribute = sequelize.define('ItemAttribute', {
    itemId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'item_id'
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
    tableName: 'item_attribute'
  });

  ItemAttribute.associate = function (models) {
    ItemAttribute.belongsTo(models.Item, {
      foreignKey: 'itemId'
    });

    ItemAttribute.belongsTo(models.Attribute, {
      foreignKey: 'attributeId'
    });
  };

  return ItemAttribute;
}
