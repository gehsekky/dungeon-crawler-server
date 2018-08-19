module.exports = (sequelize, DataTypes) => {
  const Attribute = sequelize.define('Attribute', {
    attributeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'attribute_id'
    },
    name: { type: DataTypes.STRING, allowNull: false, field: 'name' },
    description: { type: DataTypes.STRING, allowNull: false, field: 'description' },
    valueType: { type: DataTypes.ENUM('text', 'number'), allowNull: false, field: 'value_type' },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'attribute'
  });

  Attribute.associate = function (models) {
    Attribute.hasMany(models.PartyMemberAttribute, {
      foreignKey: 'attributeId',
    });
  };

  return Attribute;
}
