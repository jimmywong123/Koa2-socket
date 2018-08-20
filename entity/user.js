'use strict';
module.exports = function (sequelize, DataTypes) {
	return sequelize.define('user', {
    id: {
        primaryKey:true,
      type: DataTypes.INTEGER(11),
    },
    userId: {
      type: DataTypes.STRING(30)
    },
    name: {
      type: DataTypes.STRING(30)
    },
    img: {
      type: DataTypes.STRING(256)
    }
  }, {
    freezeTableName: true, // Model 对应的表名将与model名相同
    timestamps:false
  });

}