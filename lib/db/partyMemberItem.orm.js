module.exports = (sequelize, DataTypes) => {
  const PartyMemberItem = sequelize.define('PartyMemberItem', {
    partyMemberId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'party_member_id'
    },
    itemId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'item_id'
    },
    quantity: { type: DataTypes.INTEGER, allowNull: false, field: 'quantity' },
    createdAt: { type: DataTypes.DATE, allowNull: false, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, allowNull: false, field: 'updated_at' }
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'party_member_item'
  });

  PartyMemberItem.associate = function (models) {
    PartyMemberItem.belongsTo(models.PartyMember, {
      foreignKey: 'partyMemberId'
    });

    PartyMemberItem.belongsTo(models.Item, {
      foreignKey: 'itemId'
    });
  };

  return PartyMemberItem;
}
