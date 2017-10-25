var url = require('url');
var path = require("path");
var fs   = require("fs");

var ack = require(global.homePath + '/lib/respAck');

var actionPath = __dirname + "/../action/";

var getAction = function(acname){	
	
//	  console.info("this in getAction");
    
    var filePath = path.join(actionPath, acname+'.js');
    
    console.log("filePath");
    console.log(filePath);

  	filePath = path.normalize(filePath);//输出规范格式的path字符串。
  
	var exists = fs.existsSync(filePath);
    if(exists){   
    	
 //   		console.info("action is exist. filepath:" + filePath);
       	var ac = require(filePath);
       	return ac.action;
    }else
    {
    		console.info("" + filePath + " is not exist");
    		return null;
    }
}

var getPathAction = function(urlname, callback){
	
	//    console.info("this is getPathAction");
	var pathname = url.parse(urlname).pathname;

	var ext = path.extname(pathname);

	var actionname = pathname.substring(1,pathname.length - ext.length);
    	
   	// console.info("ext:" + ext + "actionname:" + actionname);
    	  	
	var action = getAction(actionname);

	callback( action, actionname);
}

module.exports = function(req, res, next) {
     
  //   console.info("this is " + __filename);

	getPathAction( req.url, function(action, actionname){
		if( action != null ){
			action(req,res);
			return;
		}else
			ack.noAck(res);

		console.info("method: " + req.method + " path: " + actionname + " is not process in " + __filename);
		next();//
	});
	
}
