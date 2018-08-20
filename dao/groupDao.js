var sequelize=require('../app').sequelize;
var Group = require('../entity/entity.js').Group;
var Msg = require('../entity/entity.js').Msg;
var User = require('../entity/entity.js').User;
var Util = require('../util/util.js');

exports.queryLastContacts = function(ip,senderId){
    let sql = `select g.id,g.name,g.img,g.isPrivate,g.managerId,u.id uid,u.img uimg,u.\`name\` uname,u.userId,
    (select text from msg m where m.groupId = g.id order by createDate desc limit 0,1) as lastText,
    (select img from msg m where m.groupId = g.id order by createDate desc limit 0,1) as lastImg,
    (select createDate from msg m where m.groupId = g.id order by createDate desc limit 0,1) as lastSendTime,
    (select count(um.msg_id) from user_msg um left join msg m on um.msg_id = m.id
    left join user u on um.user_id = u.id where m.groupId = g.id and um.isRead = 0 and u.userId = 'baidu-1'
    ) as notRead 
    from \`group\` g
    left join \`group_user\` gu on g.id = gu.group_id
    left join \`user\` u on gu.user_id = u.id   
    where g.id in
    (select gid.id from(select distinct gids.id from
    (select g.id,m.createDate from \`group\` g 
    left join \`group_user\` gu on g.id = gu.group_id
    left join \`user\` u on gu.user_id = u.id
    left join \`msg\` m on m.groupId = g.id
    where u.userId = 'baidu-1' order by m.createDate desc
    ) as gids limit 0,10
    ) gid)
    order by lastSendTime desc`;
    return sequelize.query(sql).then(function(results){
        let groups = [];
        for(let row of results[0]){
            if(!Util.exits(groups,row.id)){
                let group = {};
                group.id = row.id;
                group.name = row.name;
                group.img = row.img;
                console.log(row.isPrivate+''=='<Buffer 01>');
                if(row.isPrivate+''=='<Buffer 01>')
                    group.isPrivate = true;
                else
                    group.isPrivate = false;
                group.managerId = row.managerId;
                group.lastText = row.lastText;
                group.lastImg = row.lastImg;
                group.lastSendTime = row.lastSendTime;
                group.notRead = row.notRead;
                group.userList = [];
                groups.push(group);
            }
            let user = {};
            user.id = row.userId.split(ip+'-')[1];
            user.img = row.uimg;
            user.name = row.uname;
            Util.find(groups,row.id).userList.push(user);
        }
        return groups;
    });
}