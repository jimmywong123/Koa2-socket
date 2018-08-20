module.exports = function (sequelize, DataTypes) {
	return sequelize.define('msg', {
    id: {
        primaryKey:true,
      type: DataTypes.INTEGER(11),
    },
    ip: {
      type: DataTypes.STRING(20)
    },
    senderId: {
      type: DataTypes.INTEGER(11),
    },
    receiverId: {
      type: DataTypes.INTEGER(11),
    },
    groupId: {
      type: DataTypes.INTEGER(11),
    },
    text: {
      type: DataTypes.STRING(256),
    },
    img: {
      type: DataTypes.STRING(256),
    },
    createDate: {
      type: DataTypes.DATE,
    },
  }, {
    freezeTableName: true, // Model 对应的表名将与model名相同
    timestamps:false,
    tableName:'msg',

  });
}