module.exports = (sequelize, DataTypes) => {
  const ItemType = sequelize.define('ItemType', {
    itemTypeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'item_type_id'
    },
    name: { type: DataTypes.STRING(1024), allowNull: false, field: 'name' },
    description: { type: DataTypes.STRING, allowNull: false, field: 'description' },
    createdAt: { type: DataTypes.DATE, allowNull: false, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, allowNull: false, field: 'updated_at' }
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'item_type'
  });

  ItemType.associate = function (models) {
    ItemType.hasMany(models.Item, {
      foreignKey: 'itemTypeId'
    });
  };

  return ItemType;
}
