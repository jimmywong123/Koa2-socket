const server = require('../app').server
const io = require('socket.io')(server)
const groupService = require('../service/groupService');

const socketList = {};//每个用户所持有的与服务器交互的socket列表

io.on('connection', function(socket){
	socket.on('queryLastContacts', function(msg) {//查看最近的联系人列表
        let ip = 'baidu';//socket.handshake.headers.origin
        //console.log(socket.handshake);
        //存储该用户socket
        socketList[ip+'-'+msg.senderId] = socket;
        //查询最近聊天的最后一条信息 
        groupService.queryLastContacts(ip,msg.senderId).then(function(groups){
            //返回联系人列表给客户端
            console.log(groups);
            socket.emit('lastContacts',groups);
        });
    });

    socket.on('queryChat', function(msg) {//查看最近的聊天信息
        
    });

    socket.on('sendMsg', function(msg) {//发送信息
        //完善msg，将msg存入数据库
        msgs[0] = msg;
        //将信息发送给接收者
        if(socketList[socket.handshake.headers.origin+'-'+msg.receiverId]){
            socketList[socket.handshake.headers.origin+'-'+msg.receiverId].emit('newMsg',msg);
        }
    });


});