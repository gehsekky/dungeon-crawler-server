module.exports = (sequelize, DataTypes) => {
  const PartyMember = sequelize.define('PartyMember', {
    partyMemberId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'party_member_id'
    },
    gameId: { type: DataTypes.INTEGER, allowNull: false, field: 'game_id' },
    name: { type: DataTypes.STRING, allowNull: false, field: 'name' },
    createdAt: { type: DataTypes.DATE, allowNull: false, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, allowNull: false, field: 'updated_at' }
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'party_member'
  });

  PartyMember.associate = function (models) {
    PartyMember.belongsTo(models.Game, {
      foreignKey: 'gameId'
    });

    PartyMember.hasMany(models.PartyMemberAttribute, {
      foreignKey: 'partyMemberId'
    })
  };

  return PartyMember;
}
