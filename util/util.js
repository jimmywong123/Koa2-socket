exports.exits = function(objs,id){
    let result = false;
    for(let i = 0;i < objs.length;i++){
        if(objs[i].id == id){
            result = true;
        }
    }
    return result;
}

exports.find = function(objs,id){
    for(let i = 0;i < objs.length;i++){
        if(objs[i].id == id){
            return objs[i];
        }
    }
    return null;
}

exports.dateFormat = function (date,format)   
{if(date == null)
    return null; //author: meizz   
  var o = {   
    "M+" : date.getMonth()+1,                 //月份   
    "d+" : date.getDate(),                    //日   
    "h+" : date.getHours(),                   //小时   
    "m+" : date.getMinutes(),                 //分   
    "s+" : date.getSeconds(),                 //秒   
    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
    "S"  : date.getMilliseconds()             //毫秒   
  };   
  date = new Date(date+'');
  if(/(y+)/.test(format))   
  format=format.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(format))   
  format = format.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return format;
} 