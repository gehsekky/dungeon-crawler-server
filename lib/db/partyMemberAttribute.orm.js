module.exports = (sequelize, DataTypes) => {
  const PartyMemberAttribute = sequelize.define('PartyMemberAttribute', {
    partyMemberId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'party_member_id'
    },
    attributeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'attribute_id'
    },
    numberValue: { type: DataTypes.INTEGER, allowNull: true, field: 'number_value' },
    textValue: { type: DataTypes.STRING, allowNull: true, field: 'text_value' },
    createdAt: { type: DataTypes.DATE, allowNull: false, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, allowNull: false, field: 'updated_at' }
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'party_member_attribute'
  });

  PartyMemberAttribute.associate = function (models) {
    PartyMemberAttribute.belongsTo(models.PartyMember, {
      foreignKey: 'partyMemberId'
    });

    PartyMemberAttribute.belongsTo(models.Attribute, {
      foreignKey: 'attributeId'
    });
  };

  return PartyMemberAttribute;
}
