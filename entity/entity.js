var sequelize=require('../app').sequelize;
var User = sequelize.import('./user.js');
var Group = sequelize.import('./group.js');
var Msg = sequelize.import('./msg.js');

Group.hasMany(Msg, {foreignKey:'groupId', targetKey:'id', as:'msgList'});
Group.hasOne(User,{foreignKey:'managerId', targetKey:'id'});
Group.belongsToMany(User, {through: 'groupUser',foreignKey:'group_id',targetKey:'id',as:'userList'});
Msg.belongsTo(Group,{foreignKey:'groupId',targetKey:'id'});
Msg.belongsToMany(User, {through: 'user_msg',foreignKey:'msg_id',targetKey:'id',as:'msgList'});
User.belongsToMany(Group,{through: 'group_user',foreignKey:'user_id',as:'groupList'});
User.belongsToMany(Msg, {through: 'user_msg',foreignKey:'user_id',as:'msgList'});

exports.User = User;
exports.Group = Group;
exports.Msg = Msg;