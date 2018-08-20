module.exports = function (sequelize, DataTypes) {
	return sequelize.define('group', {
    id: {
        primaryKey:true,
      type: DataTypes.INTEGER(11),
    },
    name: {
      type: DataTypes.STRING(20)
    },
    managerId: {
      type: DataTypes.INTEGER(11)
    },
    isPrivate: {
      type: DataTypes.BOOLEAN(1)
    },
    img: {
      type: DataTypes.STRING(256)
    },
  }, {
    freezeTableName: true, // Model 对应的表名将与model名相同
    timestamps:false
  });
}