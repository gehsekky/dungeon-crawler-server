module.exports = (sequelize, DataTypes) => {
  const ItemTypeAttribute = sequelize.define('ItemTypeAttribute', {
    itemTypeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'item_type_id'
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
    tableName: 'item_type_attribute'
  });

  ItemTypeAttribute.associate = function (models) {
    ItemTypeAttribute.belongsTo(models.ItemType, {
      foreignKey: 'itemTypeId'
    });

    ItemTypeAttribute.belongsTo(models.Attribute, {
      foreignKey: 'attributeId'
    });
  };

  return ItemTypeAttribute;
}
