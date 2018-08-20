window.onload = function() {
    //实例并初始化我们的hichat程序
    var hichat = new HiChat();
    hichat.init();
};

//定义我们的hichat类
var HiChat = function() {
    this.socket = null;
};

//向原型添加业务方法
HiChat.prototype = {
    init: function() {//此方法初始化程序
        var that = this;
        //建立到服务器的socket连接
        this.socket = io.connect('http://localhost:3000');
        
        this.socket.emit('queryLastContacts',{'senderId':1});

        this.socket.on('lastContacts',function(groups){
            groups.forEach(function(group){
                let li = document.createElement("li");
                if(!group.isPrivate){
                    group.userList.forEach(function(user){
                        if(user.id!=1){
                            li.innerHTML = `<div>${user.name}</div>
                            <div>${user.img}</div>
                            <div>${group.lastText}</div>
                            <div>${group.notRead}</div>`;
                        }
                    })
                }else{
                    li.innerHTML = `<div>${group.name}</div>
                    <div>${group.img}</div>
                    <div>${group.lastText}</div>
                    <div>${group.notRead}</div>`;
                }
                document.getElementById('userList').appendChild(li);
            })
                
            
        })
        
    }
};