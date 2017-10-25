var express = require('express');
// var formidable = require('formidable');
var path = require("path");
var fs = require('fs');
var util = require('util');
var http = require('http');
var myGetParams = require(global.homePath + '/lib/myGetParams');
var clientUpload = require(global.homePath + '/lib/clientUpload');
var ack = require(global.homePath + '/lib/respAck');



exports.action = function(req,res){

	var params = myGetParams(req);
	// console.log("1111111111111111111");
	upload(req,res,params);
}

var upload = function(req,res,params){
	// console.log("222");
      upLoad(req,res);
}

var upLoad = function(req1,res1){

    var boundaryKey = '----' + new Date().getTime();

    var options = {

        host:'localhost',//远端服务器域名

        port:9999,//远端服务器端口号

        method:'POST',

        path:'/media/10000/',//上传服务路径

        headers:{

            'Content-Type':'text/plain; boundary=' + boundaryKey,

            'Connection':'keep-alive'

        }

    };

    var req = http.request(options,function(res){

        res.setEncoding('utf8');

        res.on('data', function (chunk) {

            console.log('body: ' + chunk);

        });

        res.on('end',function(){

            console.log('res end.');

        });

    });

    req.write(

        '–' + boundaryKey + '\r\n' +

        'Content-Disposition: form-data; name="dataFile"; filename="test.txt"\r\n' +

        'Content-Type: text/plain\r\n\r\n'

    );

    //设置1M的缓冲区

    var fileStream = fs.createReadStream('D:/test.txt',{bufferSize:1024 * 1024});

    console.log(fileStream);

    fileStream.pipe(req,{end:false});

    fileStream.on('end',function(){

        req.end('\r\n–' + boundaryKey + '–');

    });

}
