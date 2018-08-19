module.exports = (sequelize, DataTypes) => {
  const RoomType = sequelize.define('RoomType', {
    roomTypeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'room_type_id'
    },
    name: { type: DataTypes.STRING, allowNull: false, field: 'name' },
    createdAt: { type: DataTypes.DATE, allowNull: false, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, allowNull: false, field: 'updated_at' }
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'room_type'
  });

  RoomType.associate = function (models) {
    RoomType.hasMany(models.Room, {
      foreignKey: 'roomTypeId'
    })
  };

  return RoomType;
}
