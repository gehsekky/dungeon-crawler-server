module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    gameId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'item_id'
    },
    name: { type: DataTypes.STRING, allowNull: false, field: 'name' },
    itemTypeId: { type: DataTypes.INTEGER, allowNull: false, field: 'item_type_id' },
    createdAt: { type: DataTypes.DATE, allowNull: false, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, allowNull: false, field: 'updated_at' }
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'item'
  });

  Item.associate = function (models) {
    Item.belongsTo(models.ItemType, {
      foreignKey: 'itemTypeId'
    });
  };

  return Item;
}
