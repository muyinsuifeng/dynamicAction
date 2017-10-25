var express = require('express');


exports.okAck = function(res, params){
	res.writeHead(200, {"Content-Type": "applcation/json"});
	var successRtnMsgContent = {
		"rtnCode": "0",
		"rtnMsg": "成功",
		"bean":{},
		"beans": null,
		"object":{
			"rtnCode": "0",
			"rtnMsg": params
		}
	}
	var successRtnMsg = JSON.stringify(successRtnMsgContent);
	res.end(successRtnMsg);
}

exports.noAck = function(res, params){
	res.writeHead(404, {"Content-Type": "applcation/json"});
    res.end(params || "{}");

}

exports.errAck = function(res){
	res.writeHead(200, {"Content-Type": "applcation/json"});
    var errRtnMsgContent = {
    	"rtnCode": "0", 
		"rtnMsg": "成功", 
		"bean":{}, 
		"beans": null, 
		"object":{
			"rtnCode": "-9999", 
		    "rtnMsg": "服务端捕获异常!"
		}
    }
    var errRtnMsg = JSON.stringify(errRtnMsgContent);
    res.end(errRtnMsg);
}
